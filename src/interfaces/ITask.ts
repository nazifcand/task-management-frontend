import { IProject } from './IProject';
import { IStatus } from './IStatus';
import { ITag } from './ITag';
import { IUser } from './IUser';

export interface ITask {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  projectId: number;
  project: IProject;
  statusId: number;
  status: IStatus;
  users: IUser[];
  tags: ITag[];
  createdUserId: number;
  createdUser: IUser;
}
