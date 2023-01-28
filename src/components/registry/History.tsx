import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useTypedDispatch } from 'src/store';
import { DocType } from 'src/common/enums/app/doc-type.enum';
import { HistoryRec } from 'src/interfaces/services/models/HistoryRec';
import { getHistoryByRegistryId } from 'src/store/registry/actions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CreateData = (props: { doc: HistoryRec }) => {
  const { edit } = props.doc;

  return (
    <>
      {edit.person && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="center">
              Зміни в персональних даних
            </Typography>
            {edit.person.fullname && (
              <Typography>{`ПІБ: ${edit.person.fullname}`}</Typography>
            )}
            {edit.person.taxpayer_code && (
              <Typography>{`Ідентифікаційний код: ${edit.person.taxpayer_code}`}</Typography>
            )}
            {edit.person.date_of_birth && (
              <Typography>{`Дата народження: ${dayjs(
                edit.sertificating_date,
              ).format('YYYY-MM-DD')}`}</Typography>
            )}
          </Grid>
          {edit.person.place_of_living && (
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Місце проживання</Typography>
              <Typography>{`Країна: ${
                edit.person.place_of_living.country || 'Без змін'
              }`}</Typography>
              <Typography>{`Адресний рядок 1: ${
                edit.person.place_of_living.line_1 || 'Без змін'
              }`}</Typography>
              <Typography>{` Адресний рядок 2: ${
                edit.person.place_of_living.line_2 || 'Без змін'
              }`}</Typography>
            </Grid>
          )}
          {edit.person.place_of_birth && (
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Місце народження</Typography>
              <Typography>{`Країна: ${
                edit.person.place_of_birth.country || 'Без змін'
              }`}</Typography>
              <Typography>{`Адресний рядок 1: ${
                edit.person.place_of_birth.line_1 || 'Без змін'
              }`}</Typography>
              <Typography>{` Адресний рядок 2: ${
                edit.person.place_of_birth.line_2 || 'Без змін'
              }`}</Typography>
            </Grid>
          )}
        </Grid>
      )}
      <Grid container spacing={3}>
        {
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="center">
              Зміни в заповіті
            </Typography>
          </Grid>
        }
        <Grid item xs={12} sm={6}>
          {edit.type && (
            <Typography>{`Тип документа: ${
              Object.values(DocType)[edit.type] || DocType.WILL
            }`}</Typography>
          )}
          {edit.blanks_numbers && (
            <Typography>{`Номер бланку: ${edit.blanks_numbers.toString()}`}</Typography>
          )}
          {edit.sertificating_date && (
            <Typography>{`Дата реєстрації: ${dayjs(
              edit.sertificating_date,
            ).format('YYYY-MM-DD')}`}</Typography>
          )}
        </Grid>
        {edit.sertificating_place && (
          <Grid item xs={12} sm={6}>
            <Typography align="center">Місце реєстрації</Typography>
            <Typography>{`Країна: ${
              edit.sertificating_place.country || 'Без змін'
            }`}</Typography>
            <Typography>{`Адресний рядок 1: ${
              edit.sertificating_place.line_1 || 'Без змін'
            }`}</Typography>
            <Typography>{` Адресний рядок 2: ${
              edit.sertificating_place.line_2 || 'Без змін'
            }`}</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

const Row = (props: { row: HistoryRec }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{
        width: 'auto',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <TableCell>{`${new Date(props.row.time)
          .toISOString()
          .substring(0, 10)} ${new Date(props.row.time)
          .toISOString()
          .substring(11, 19)}`}</TableCell>
        <TableCell align="right">{props.row.user.name}</TableCell>
      </AccordionSummary>
      <AccordionDetails>
        <CreateData doc={props.row} />
      </AccordionDetails>
    </Accordion>
  );
};

export const History = (props: { registryId: number }) => {
  const dispatch = useTypedDispatch();

  const [rows, setRows] = React.useState<HistoryRec[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    async function fetchData() {
      const history = await dispatch(getHistoryByRegistryId(props.registryId));
      console.log(history, 'dispatch');
      if (history) setRows(history);
    }
    fetchData();
  }, [dispatch, props.registryId]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell> {'Дата та час'}</TableCell>
              <TableCell align="left">{'Реєстратор'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row) => {
                return <Row row={row} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        colSpan={3}
        SelectProps={{
          inputProps: {
            'aria-label': 'к-ть рядків',
          },
          native: true,
        }}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
