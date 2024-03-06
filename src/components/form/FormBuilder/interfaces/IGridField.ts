import IInputProps from '../../Input/IInputProps';
import IGridSizes from './IGridSizes';

/**
 * Grid Field
 * It have a Grid Size
 * It can be a Select, Input or Dropzone
 * @see ISelectProps
 * @see IInputProps
 * @see IDropzoneProps
 * @see IGridSizes
 */
type IGridField = IGridSizes & (
  IInputProps
);

export default IGridField;
