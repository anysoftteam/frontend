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
import { User } from 'src/interfaces/services/models/User';
import { useTypedDispatch, useTypedSelector } from 'src/store';
import { loadRegistrars } from 'src/store/registrator/slice';
import { UserFilter } from 'src/interfaces/Filters';
import {
  fetchRegistrarsData,
  setStatusById,
} from 'src/store/registrator/actions';
import { PaginationSearch } from './PaginationSearch';

interface Column {
  id: 'fullname' | 'email' | 'organization' | 'position';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: Column[] = [
  { id: 'fullname', label: 'ПІБ Реєстратора', minWidth: 170 },
  { id: 'email', label: 'Пошта', minWidth: 170 },
  {
    id: 'organization',
    label: 'Організація',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'position',
    label: 'Посада',
    minWidth: 170,
    align: 'right',
  },
];

const Row = (props: {
  row: User;
  onSetEnable: (user: User, status: boolean) => void;
}) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log(props.row);

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

        {columns.map((column) => (
          <TableCell key={column.id} align={column.align}>
            {row[column.id]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Деталі відомості про Реєстратора
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell>Дата народження</TableCell>
                    <TableCell align="right">
                      {dayjs(row.date_of_birth).format('YYYY-MM-DD')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ідентифікаційний код</TableCell>
                    <TableCell align="right">{row.taxpayer_code}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Серія та/або номер паспорта</TableCell>
                    <TableCell align="right">
                      {`${
                        row.passport.series.length > 0 &&
                        `${row.passport.series}, `
                      }${row.passport.code}`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ким та коли видано паспорт</TableCell>
                    <TableCell align="right">{`[${row.passport.establisher_code.toString()}] ${dayjs(
                      row.passport.date_of_establishing,
                    ).format('YYYY-MM-DD')}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button
                        href={`/registrator/${row.id}`}
                        variant="outlined"
                        sx={{ my: 1, mx: 1.5 }}
                      >
                        Внести зміни
                      </Button>
                      <Button
                        onClick={() => {
                          props.onSetEnable(props.row, !props.row.is_enable);
                        }}
                        variant="outlined"
                        sx={{ my: 1, mx: 1.5 }}
                      >
                        {row.is_enable ? 'Деактивувати' : 'Активувати'}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const RegistrarTable = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const dispatch = useTypedDispatch();
  const registrar = useTypedSelector(loadRegistrars);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = React.useCallback(
    (searchData: UserFilter) => {
      dispatch(
        fetchRegistrarsData({ ...searchData, page, per_page: rowsPerPage }),
      );
    },
    [dispatch, page],
  );

  const handleSetStatus = React.useCallback(
    (user: User, status: boolean) => {
      dispatch(setStatusById(user, status));
    },
    [dispatch],
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
            {registrar.registrars.map((row) => (
              <Row key={row.id} row={row} onSetEnable={handleSetStatus} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={registrar.page}
        count={registrar.totalPages}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        size="small"
      />
    </Paper>
  );
};
