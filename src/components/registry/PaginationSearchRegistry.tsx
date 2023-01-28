import * as React from 'react';
import dayjs from 'dayjs';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Grid, Box, Stack, TextField, Button } from '@mui/material';
import { SearchFields } from './SearchFields';
import { RegistryFilter } from 'src/interfaces/Filters';

const initialSFields: SearchFields = {
  fullname: '',
  taxpayer_code: '',
};

const fWidth = 300;

export default function PaginationSearch(props: {
  onSearch: (searchData: RegistryFilter) => void;
}) {
  const [searchData, setSearchData] =
    React.useState<SearchFields>(initialSFields);

  const [dateValue, setDates] = React.useState<DateRange<Date>>([null, null]);

  const handleSearch = () => {
    const fields: RegistryFilter = {
      date1:
        dateValue[0] === null
          ? undefined
          : dayjs(dateValue[0]).format('YYYY-MM-DD'),
      date2:
        dateValue[1] === null
          ? undefined
          : dayjs(dateValue[1]).format('YYYY-MM-DD'),
      fullname: searchData.fullname === '' ? undefined : searchData.fullname,
      taxpayer_code:
        searchData.taxpayer_code === '' ? undefined : searchData.taxpayer_code,
      page: 0,
      per_page: 0,
    };

    props.onSearch(fields);
  };
  return (
    <Box
      sx={{
        width: '100wh',
        mx: 'auto',
        p: 3,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 1 }}
        >
          <TextField
            id="outlined-basic"
            label="ПІБ"
            variant="outlined"
            value={searchData.fullname}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchData({
                ...searchData,
                fullname: event.target.value,
              });
            }}
            sx={{ width: fWidth }}
          />
          <TextField
            id="outlined-basic"
            label="Податковий номер"
            variant="outlined"
            value={searchData.taxpayer_code}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchData({
                ...searchData,
                taxpayer_code: event.target.value,
              })
            }
            sx={{ width: fWidth }}
          />
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 1 }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              value={dateValue}
              onChange={(newValue) => {
                setDates(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> --- </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </Stack>
      </Grid>
      <Box textAlign="center" sx={{ p: 2 }}>
        <Button variant="outlined" onClick={handleSearch}>
          Пошук
        </Button>
      </Box>
    </Box>
  );
}
