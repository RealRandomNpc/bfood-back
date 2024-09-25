import { Access } from "payload/config";


const loggedIn: Access = ({req: {user}}) => {
  return !!user
}

export default loggedIn