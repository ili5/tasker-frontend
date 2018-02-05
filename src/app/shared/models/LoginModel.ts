import {Deserializable} from './deserializable.model';

export class LoginModel implements Deserializable<LoginModel> {
  public access_token: string;
  public expires_in: string;
  public refresh_token: string;
  public token_type: string;

  deserialize(input: any): LoginModel {
    Object.assign(this, input);
    return this;
  }
}
