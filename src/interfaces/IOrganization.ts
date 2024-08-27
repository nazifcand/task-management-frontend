import { IProject } from './IProject';
import { IUser } from './IUser';

export interface IOrganization {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  projects: IProject[];
  users: IUser[];
  createdUserId: number;
  createdUser: IUser;
}
