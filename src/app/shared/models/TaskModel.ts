import {Deserializable} from "./deserializable.model";
import {UserModel} from './UserModel';

export class TaskModel implements Deserializable<TaskModel> {
  public id: string;
  public title: string;
  public description: string;
  public board: string;
  public creator: UserModel;
  public assigned: UserModel;
  public due_date: any;
  public created_at: any;
  public updated_at: any;

  deserialize(input: any): TaskModel {
    Object.assign(this, input);

    if (this.creator.data) {
      this.creator = new UserModel().deserialize(this.creator.data);
    }

    if (this.assigned.data) {
      this.assigned = new UserModel().deserialize(this.assigned.data);
    }
    return this;
  }
}
