import { ReturnDataService } from './../interfaces/global';
import { loginInterface, rigisterInterface } from "../interfaces/user";

interface UserRepo {
  rigesterUser(body: rigisterInterface): Promise<ReturnDataService>;
  login (body: loginInterface): Promise<ReturnDataService>;
}

export default UserRepo;
