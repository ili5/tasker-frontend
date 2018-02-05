import {Deserializable} from './deserializable.model';
import {UserModel} from "./UserModel";
import {BoardModel} from "./BoardModel";
import {TaskModel} from "./TaskModel";

export class ProjectModel implements Deserializable<ProjectModel>{
  public data: any;
  public id: string;
  public name: string;
  public description: string;
  public owner: boolean;
  public user: UserModel;
  public associatedUsers: UserModel[];
  public boards: BoardModel[];
  public tasks: TaskModel[];
  public created_at: any;
  public updated_at: any;

  deserialize(input: any): ProjectModel {
    Object.assign(this, input);
    if (input.user) {
      this.user = new UserModel().deserialize(input.user.data);
    }

    if (input.associatedUsers) {
      this.associatedUsers = input.associatedUsers.data.map((user) => new UserModel().deserialize(user));
    }

    if (input.boards) {
      this.boards = input.boards.data.map((board) => new BoardModel().deserialize(board));
    }

    if (input.tasks) {
      this.tasks = input.tasks.data.map((task) => new TaskModel().deserialize(task));
    }

    return this;
  }
}
