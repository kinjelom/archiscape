import dayjs from 'dayjs';
import { IProject } from 'app/shared/model/project.model';

export interface IProjectContent {
  id?: number;
  version?: number;
  importDate?: string;
  fileName?: string | null;
  content?: string;
  project?: IProject;
}

export const defaultValue: Readonly<IProjectContent> = {};
