import {Deserializable} from './deserializable.model';

export class ProjectModel implements Deserializable<ProjectModel>{
  public id: string;
  public name: string;
  public description: string;

  deserialize(input: any): ProjectModel {
    Object.assign(this, input);
    return this;
  }
}
