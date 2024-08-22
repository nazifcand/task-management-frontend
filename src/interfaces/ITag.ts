import { IProject } from './IProject';
import { ITask } from './ITask';
import { IUser } from './IUser';

export interface ITag {
  id: number;
  title: string;
  color: string;
  textColor: string;
  projectId: number;
  project: IProject;
  tasks: ITask[];
  createdUserId: number;
  createdUser: IUser;
}
