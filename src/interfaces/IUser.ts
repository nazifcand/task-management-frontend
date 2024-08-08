import { IOrganization } from './IOrganization';
import { ITask } from './ITask';
import { IUserGroup } from './IUserGroup';

export interface IUser {
  username: string;
  email: string;
  phone: string;
  name: string;
  surname: string;
  avatar: string;
  lastLogin: string;
  userGroupId: number;
  userGroup: IUserGroup;
  organizations: IOrganization[];
  tasks: ITask[];
}
