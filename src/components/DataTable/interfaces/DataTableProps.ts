import FormHandler from '@/hooks/form/FormHandler';
import Metadata from './Metadata';
import { DataTableFilter } from '../EnhancedTableToolbar';

interface DefaultProps {
  metadata: Metadata[];

  title?: string;
  dense?: boolean;
  hasTableHead?: boolean;
  selectable?: boolean;
  toolbar?: boolean;
  denseButton?: boolean;
  checkbox?: boolean;
  pagination?: boolean;
  haveActions?: boolean;
  filter?: DataTableFilter;
  actions?: (row: any) => JSX.Element;
}

interface WithData extends DefaultProps {
  data: any[];
  url?: undefined;
}

interface WithApi extends DefaultProps {
  url: string;
  data?: undefined;
}

type DataTableProps = WithData | WithApi;

export default DataTableProps;
