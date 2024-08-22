import { IProject } from './IProject';
import { IUser } from './IUser';

export interface IStatus {
  id: number;
  title: string;
  color: string;
  priority: number;
  default: boolean;
  projectId: number;
  project: IProject;
  createdUserId: number;
  createdUser: IUser;
}
