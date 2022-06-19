import { ILandscape } from 'app/shared/model/landscape.model';

export interface IProject {
  id?: number;
  name?: string;
  description?: string | null;
  configuration?: string | null;
  active?: boolean;
  landscape?: ILandscape;
}

export const defaultValue: Readonly<IProject> = {
  active: false,
};
