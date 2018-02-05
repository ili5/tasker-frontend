import {Deserializable} from "./deserializable.model";

export class TaskModel implements Deserializable<TaskModel> {
  public id: string;
  public title: string;
  public description: string;
  public board: string;
  public created_at: any;
  public updated_at: any;

  deserialize(input: any): TaskModel {
    Object.assign(this, input);
    return this;
  }
}
