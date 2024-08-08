import { IProject } from './IProject';
import { IUser } from './IUser';

export interface IStatus {
  title: string;
  color: string;
  priority: number;
  default: boolean;
  projectId: number;
  project: IProject;
  createdUserId: number;
  createdUser: IUser;
}
