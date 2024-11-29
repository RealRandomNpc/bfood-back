import {
  TypeWithID,
  RelationshipField,
  CollectionAfterChangeHook,
  RequestContext,
} from "payload/types";

/**
 * Updates the relationship references on the target collection when the source collection changes.
 * Note: This does not work on polymorphic relationships. `processedPrevValueArray` and `processedNextValueArray` can be modified to add the support.
 * Note: This expectes a flat schema.  Can be modified to support nested relationships with something like `Lodash.get()`.
 */
export function updateRelationshipRefs<
  SourceCollection extends TypeWithID = any,
  TargetCollection extends TypeWithID = any,
>({
  relationshipId,
  sourceFieldName,
  targetFieldName,
  convertToBoolean = false,
}: {
  /**
   * A unique identifier for the relationship. This is used to prevent infinite loops.
   * This should be specified on both the source and target collections.
   */
  relationshipId: string;
  /**
   * The field name on the source collection that contains the relationship.
   */
  sourceFieldName: keyof SourceCollection;
  /**
   * The field name on the target collection that contains the opposite relationship.
   */
  targetFieldName: keyof TargetCollection;
  /**
   * The field name on the target collection that needed to be converted to boolean or stay as Id
   */
  convertToBoolean?: boolean;
}): CollectionAfterChangeHook<SourceCollection> {
  return async function (params) {
    const { req, previousDoc, doc, collection } = params;

    const docId = doc.id;

    // process and compare the values
    const prevValue = previousDoc?.[sourceFieldName] || [];
    const nextValue = doc[sourceFieldName] || [];

    const prevValueArray = Array.isArray(prevValue) ? prevValue : [prevValue];
    const nextValueArray = Array.isArray(nextValue) ? nextValue : [nextValue];

    const processedPrevValueArray = prevValueArray.map((v) =>
      typeof v === "object" && "id" in v ? v.id : v
    ) as string[];
    const processedNextValueArray = nextValueArray.map((v) =>
      typeof v === "object" && "id" in v ? v.id : v
    ) as string[];

    const targetDeletedDocIds = new Set(
      processedPrevValueArray.filter(
        (x) => !processedNextValueArray.includes(x)
      )
    );
    const targetAddedDocIds = new Set(
      processedNextValueArray.filter(
        (x) => !processedPrevValueArray.includes(x)
      )
    );

    if (!targetDeletedDocIds.size && !targetAddedDocIds.size) return;

    const context = params.context as RequestContext & {
      updateRelationshipRefsHistory: string[];
    };
    context.updateRelationshipRefsHistory =
      context.updateRelationshipRefsHistory ?? [];

    if (context.updateRelationshipRefsHistory.includes(relationshipId)) return;
    context.updateRelationshipRefsHistory.push(relationshipId);

    // find the source field
    const field = collection.fields.find(
      (field) => "name" in field && field.name === sourceFieldName
    ) as RelationshipField | undefined;

    if (!field) {
      throw new Error(
        `Field "${String(sourceFieldName)}" not found in collection "${collection.slug}."`
      );
    }

    // find the target collection
    const targetCollectionName = field.relationTo as string;
    const targetCollection = req.payload.collections[targetCollectionName];

    if (!targetCollection) {
      throw new Error(
        `Collection "${targetCollectionName}" not found in config.`
      );
    }

    // find the target field
    const targetField = targetCollection.config.fields.find(
      (field) => "name" in field && field.name === targetFieldName
    ) as RelationshipField | undefined;

    if (!targetField) {
      throw new Error(
        `Field "${String(targetFieldName)}" not found in collection "${targetCollection.config.slug}."`
      );
    }

    // find the target docs
    const { docs: targetDocs } = await req.payload.find({
      req,
      collection: targetCollectionName,
      pagination: false,
      depth: 0,
      where: {
        id: {
          in: [
            ...Array.from(targetDeletedDocIds),
            ...Array.from(targetAddedDocIds),
          ],
        },
      },
    });


    // update the target docs
    await Promise.all(
      targetDocs.map((targetDoc) => {
        const targetValue = targetDoc[targetFieldName as string] || [];
        const targetValueSet = new Set(
          Array.isArray(targetValue) ? targetValue : [targetValue]
        );

        if (targetDeletedDocIds.has(targetDoc.id as string)) {
          targetValueSet.delete(docId);
        } else if (targetAddedDocIds.has(targetDoc.id as string)) {
          targetValueSet.add(docId);
        }

        const newTargetData = convertToBoolean
          ? {
              [targetFieldName]: targetValueSet.size !== 0,
            }
          : {
              [targetFieldName]: targetField.hasMany
                ? Array.from(targetValueSet)
                : (Array.from(targetValueSet)[0] ?? null),
            };

        return req.payload.update({
          req,
          collection: targetCollectionName,
          id: targetDoc.id,
          context,
          data: newTargetData,
        });
      })
    );
  };
}
