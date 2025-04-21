import { User } from "./user.model";

export interface UserReponse {
    valid: boolean;
    token: string;
    user: User
  }