// This is the user model class.
// Note the variable ! means that this variable is required

export class UserModel{
  oauthId?: string;
  userId!: string;
  goalCreated?: number;
  name?: string;
  email?: string;
  picture?:string;
}
