import {Deserializable} from "./deserializable.model";
import {UserModel} from "./UserModel";

export class MessageModel implements Deserializable<MessageModel> {
  public id: string;
  public owner: boolean;
  public showEdit = false;
  public user: UserModel;
  public message: string;
  public created_at: any;
  public updated_at: any;

  deserialize(input: any): MessageModel {
    Object.assign(this, input);

    if (this.user.data) {
      this.user = new UserModel().deserialize(this.user.data);
    }

    return this;
  }
}
