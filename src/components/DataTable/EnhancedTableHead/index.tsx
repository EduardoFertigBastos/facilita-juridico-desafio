import React from 'react';
import {
  Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import Metadata from '../interfaces/Metadata';
import Order from '../interfaces/Order';

interface EnhancedTableProps {
  metadata: Metadata[];
  checkbox: boolean;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: string
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  haveActions?: boolean;
  actions?: boolean;
  hasTableHead?: boolean;
}

const EnhancedTableHead:React.FC<EnhancedTableProps> = ({
  checkbox,
  metadata,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  haveActions,
  hasTableHead = true,
  actions,
}) => {
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  if (!hasTableHead) {
    return <></>;
  }
  return (
    <TableHead>
      <TableRow>
        {checkbox && (

          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={
                numSelected > 0 && numSelected < rowCount
              }
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'Select All',
              }}
            />
          </TableCell>
        )}
        {metadata.map((headCell, index) => (
          <TableCell
            key={headCell.prop}
            align={headCell.numeric ? 'right' : 'left'}
            padding={(index === 0 && checkbox) ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.prop ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.prop}
              direction={orderBy === headCell.prop ? order : 'asc'}
              onClick={createSortHandler(headCell.prop)}
            >
              {headCell.label}
              {orderBy === headCell.prop ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {actions && haveActions && (
          <TableCell
            align="center"
            padding="none"
          >
            Ações
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
