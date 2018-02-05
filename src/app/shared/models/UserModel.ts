import {Deserializable} from './deserializable.model';

export class UserModel implements Deserializable<UserModel> {
  public data: any;
  public id: string;
  public name: string;
  public email: string;
  public created_at: any;
  public updated_at: any;

  deserialize(input: any): UserModel {
    Object.assign(this, input);
    return this;
  }
}
