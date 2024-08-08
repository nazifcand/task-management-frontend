import { IOrganization } from './IOrganization';
import { IStatus } from './IStatus';
import { ITask } from './ITask';
import { IUser } from './IUser';

export interface IProject {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  organizationId: number;
  organization: IOrganization;
  tasks: ITask[];
  statuses: IStatus[];
  createdUserId: number;
  createdUser: IUser;
}
