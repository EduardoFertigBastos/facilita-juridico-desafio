'use client';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { TablePagination } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import getDescendantProp from '@/helpers/getDescendantProp';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import getComparator from './hooks/getComparator';
import stableSort from './hooks/stableSort';
import DataTableProps from './interfaces/DataTableProps';
import Order from './interfaces/Order';
import { ButtonGroup, Container, SubContainerPaper } from './style';

const DENSE_TABLE_CONFIG = '@UNI_AVALIA:dense_table';
const ROWS_PAGE_CONFIG = '@UNI_AVALIA:rows_page_table';

const DataTable: React.FC<DataTableProps> = ({
  title: tableTitle = 'Nutrition',
  dense: denseDefault = false,
  metadata,
  denseButton = true,
  toolbar = true,
  checkbox = false,
  selectable = false,
  pagination = true,
  data: preLoadedData,
  haveActions = true,
  hasTableHead = true,
  actions,
  url,
  filter
}) => {
  const primaryKey = useMemo(
    () => metadata.find((item) => item.primaryKey)?.prop ?? 'id',
    [metadata],
  );

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>(primaryKey);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(() => {
    const value = typeof window !== 'undefined' 
      ? localStorage.getItem(DENSE_TABLE_CONFIG) ?? denseDefault
      : denseDefault;

    return value ? value === 'true' : denseDefault;
  });
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    const value = typeof window !== 'undefined' 
      ? localStorage.getItem(ROWS_PAGE_CONFIG) ?? 10
      : 10
      
    return value ? Number(value) : 10;
  });
  const [rows, setRows] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState<number | null>(null);

  const handleRequestSort = useCallback((
    event: React.MouseEvent<unknown>,
    property: any,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [order, orderBy]);

  const handleSelectAllClick = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n[primaryKey]);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }, [rows, primaryKey]);

  const handleClick = useCallback((event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }, [selected]);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    localStorage.setItem(ROWS_PAGE_CONFIG, String(event.target.value));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleChangeDense = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
    localStorage.setItem(DENSE_TABLE_CONFIG, String(event.target.checked));
  }, []);

  const isSelected = useCallback((name: string) => (
    selected.indexOf(name) !== -1
  ), [selected]);

  useEffect(() => {
    if (preLoadedData) {
      return setRows(preLoadedData);
    }
  }, [preLoadedData]);

  function calcEmptyRows() {
    if (!preLoadedData && totalRows) {
      if (totalRows - (page) * rowsPerPage < rowsPerPage) {
        return rowsPerPage - (totalRows % rowsPerPage);
      }

      return 0;
    }

    return Math.max(0, (1 + page) * rowsPerPage - rows.length);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = calcEmptyRows();

  const sliceInitial = useCallback(
    () => (preLoadedData ? page * rowsPerPage : 0),
    [page, rowsPerPage, preLoadedData],
  );

  const sliceFinal = useCallback(
    () => (preLoadedData ? page * rowsPerPage + rowsPerPage : undefined),
    [page, rowsPerPage, preLoadedData],
  );

  return (
    <Container>
      <SubContainerPaper sx={{ width: '100%', mb: 2 }}>
        {
          toolbar && (
            <EnhancedTableToolbar
              numSelected={selected.length}
              title={tableTitle}
              filter={filter}
            />
          )
        }

        <TableContainer className="decent-horizontal-scrollbar-datatable">
          <Table
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            {hasTableHead && (
              <EnhancedTableHead
                checkbox={checkbox}
                metadata={metadata}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                haveActions={!!haveActions}
                actions={!!actions}
              />
            )}

            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(
                  sliceInitial(),
                  sliceFinal(),
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id as string);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => (
                        selectable ? handleClick(event, row.id as string) : false
                      )}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row[primaryKey]}
                      selected={isItemSelected}
                    >
                      {
                        checkbox && (
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby':
                                  labelId,
                              }}
                            />
                          </TableCell>
                        )
                      }
                      {metadata.map((item) => (
                        <TableCell
                          key={item.prop}
                          component={item.primaryKey ? 'th' : 'td'}
                          align={item.numeric ? 'right' : 'left'}
                        >
                          {
                            item.mask
                              ? item.mask(getDescendantProp(row, item.prop), row)
                              : getDescendantProp(row, item.prop)
                          }
                        </TableCell>
                      ))}
                      {
                        actions && haveActions && (
                          <TableCell align="right">
                            <ButtonGroup>
                              {actions(row)}
                            </ButtonGroup>
                          </TableCell>
                        )
                      }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {pagination && (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            labelRowsPerPage="Mostrar"
            count={totalRows ?? rows.length}
            className="decent-horizontal-scrollbar-datatable"
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}

      </SubContainerPaper>
      {
        denseButton && (
          <FormControlLabel
            label="Concentrado"
            control={
              <Switch checked={dense} onChange={handleChangeDense} />
            }
          />
        )
      }
    </Container>
  );
};

export default DataTable;
