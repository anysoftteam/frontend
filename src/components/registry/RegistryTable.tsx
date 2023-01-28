import * as React from 'react';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import dayjs from 'dayjs';
import PaginationSearch from './PaginationSearchRegistry';
import { useTypedDispatch, useTypedSelector } from 'src/store';
import { RegistryFilter } from 'src/interfaces/Filters';
import { fetchRegistryData } from 'src/store/registry/actions';
import { loadRegistry } from 'src/store/registry/slice';
import { DocType } from 'src/common/enums/app/doc-type.enum';
import { DocRecord } from 'src/interfaces/services/models/Record';
import { UserRole } from 'src/common/enums/app/role.enum';
import { StorageKey } from 'src/common/enums/storage-key.enum';
import { History } from './History';

interface Column {
  id: 'name' | 'code' | 'date' | 'type';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => any;
}

const columns: Column[] = [
  { id: 'name', label: 'ПІБ Заповідача', minWidth: 170 },
  { id: 'code', label: 'Ідентифікаційний код', minWidth: 170 },
  {
    id: 'date',
    label: 'Дата народження',
    minWidth: 170,
    align: 'right',
    format: (value: string) => dayjs(value).format('YYYY-MM-DD'),
  },
  {
    id: 'type',
    label: 'Вид відомості',
    minWidth: 170,
    align: 'right',
    format: (value: number) => Object.values(DocType)[value] || DocType.WILL,
  },
];

interface Data {
  name: string;
  code: string;
  date: string;
  type: number;
}

function createData(registry: DocRecord): Data {
  return {
    name: registry.person.fullname,
    code: registry.person.taxpayer_code,
    date: registry.person.date_of_birth,
    type: registry.type,
  };
}

function Row(props: { row: DocRecord }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const rowData = createData(row);

  const role: string = JSON.parse(
    localStorage.getItem(StorageKey.USER) || '',
  ).role;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {columns.map((column) => {
          const value = rowData[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.format ? column.format(value) : value}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Деталі відомості про документ
              </Typography>
              <Table size="small" aria-label="purchases">
                {/* <TableHead>
                 
                </TableHead> */}
                <TableBody>
                  <TableRow>
                    <TableCell>Номер бланку</TableCell>
                    <TableCell align="right">
                      {row.blanks_numbers.toString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Дата реєстрації</TableCell>
                    <TableCell align="right">
                      {dayjs(row.sertificating_date).format('YYYY-MM-DD')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Місце реєстрації документа</TableCell>
                    <TableCell align="right">
                      {`${row.sertificating_place.line_1}, ${row.sertificating_place.line_2}, ${row.sertificating_place.country}`}
                    </TableCell>
                  </TableRow>
                  {role === UserRole.REGISTRATOR && (
                    <TableRow>
                      <TableCell>
                        <Button
                          href={`/registry/${row.id}`}
                          variant="outlined"
                          sx={{ my: 1, mx: 1.5 }}
                        >
                          Внести зміни
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {role === UserRole.ADMIN && (
                <>
                  <Typography variant="h6" gutterBottom component="div">
                    Історія
                  </Typography>
                  <History registryId={row.id as number} />
                </>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function RegistryTable() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const dispatch = useTypedDispatch();
  const registry = useTypedSelector(loadRegistry);
  console.log(registry);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = React.useCallback(
    (searchData: RegistryFilter) => {
      dispatch(
        fetchRegistryData({ ...searchData, page, per_page: rowsPerPage }),
      );
    },
    [dispatch, page],
  );

  return (
    <Paper sx={{ width: '100%' }}>
      <PaginationSearch onSearch={handleSearch} />
      <TableContainer sx={{ minHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {registry.doc.records.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={registry.doc.page}
        count={registry.doc.totalPages}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        size="small"
      />
    </Paper>
  );
}
