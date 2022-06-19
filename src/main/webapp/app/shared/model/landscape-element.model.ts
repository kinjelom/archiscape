import { ILandscape } from 'app/shared/model/landscape.model';
import { ElementType } from 'app/shared/model/enumerations/element-type.model';

export interface ILandscapeElement {
  id?: string;
  type?: ElementType;
  documentation?: string | null;
  landscape?: ILandscape;
}

export const defaultValue: Readonly<ILandscapeElement> = {};
