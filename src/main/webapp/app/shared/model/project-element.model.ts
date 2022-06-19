import { ElementType } from 'app/shared/model/enumerations/element-type.model';

export interface IProjectElement {
  id?: number;
  name?: string;
  type?: ElementType;
  documentation?: string | null;
  landscapeElementId?: string | null;
}

export const defaultValue: Readonly<IProjectElement> = {};
