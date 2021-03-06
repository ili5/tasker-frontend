import {Deserializable} from "./deserializable.model";

export class BoardModel implements Deserializable<BoardModel> {
  public id: string;
  public name: string;
  public color: string;

  deserialize(input: any): BoardModel {
    Object.assign(this, input);
    return this;
  }
}
