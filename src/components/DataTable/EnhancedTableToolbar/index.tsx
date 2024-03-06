import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Toolbar, Tooltip, Typography, alpha,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FormHandler from '@/hooks/form/FormHandler';
import FormBuilder from '@/components/form/FormBuilder';
import { ContainerButtonFilter, FormContainer } from './style';
import Button from '@/components/Button';

interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
  filter?: DataTableFilter;
}

export interface DataTableFilter {
  form: FormHandler;
  handleFilterCallback: (data: any) => void;
}

/**
 * Top of the table with the title and the number of selected rows
 * @param props
 * @returns
 */
const EnhancedTableToolbar:React.FC<EnhancedTableToolbarProps> = ({ 
  numSelected, 
  title, 
  filter
}) => {
  const [openFilter, setOpenFilter] = useState(false);

  function handleClickToOpenFilters() {
    setOpenFilter(!openFilter);
  }

  function handleFilter() {
    const data = filter?.form?.getData();

    filter?.handleFilterCallback(data);
  }

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) => alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected}
            {' '}
            {numSelected > 1 ? 'selecionados' : 'selecionado'}
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )}
        
        <Tooltip title="Listra de Filtros" onClick={handleClickToOpenFilters}>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {
        !openFilter || !filter ? null : (
          <FormContainer ref={filter.form?.ref} placeholder="Filtros" onSubmit={handleFilter}>
            <FormBuilder fields={filter.form?.fields} />

            <ContainerButtonFilter>
              <Button type='submit'>
                FILTRAR
              </Button>
            </ContainerButtonFilter>
          </FormContainer>
        )
      }
    </>
  );
}

export default EnhancedTableToolbar;
