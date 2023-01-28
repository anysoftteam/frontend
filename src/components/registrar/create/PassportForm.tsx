import * as React from 'react';
import { Grid, TextField } from '@mui/material';
import { PassportData } from './Data';

export const PassportForm = (params: {
  onChange: (passportData: PassportData) => void;
  passportData: PassportData;
}) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="code"
            name="code"
            label="Номер"
            value={params.passportData.code}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.passportData,
                code: event.target.value,
              })
            }
            inputProps={{ length: 4 }}
            fullWidth
            type="number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="series"
            name="series"
            label="Серія"
            value={params.passportData.series}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.passportData,
                series: event.target.value,
              })
            }
            inputProps={{ maxLength: 2, textTransform: 'uppercase' }}
            fullWidth
            type="text"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="date_of_establishing"
            name="date_of_establishing"
            label="Дата видачі"
            value={params.passportData.date_of_establishing}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.passportData,
                date_of_establishing: event.target.value,
              })
            }
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
              className: 'DatePicker',
            }}
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="establisher_code"
            name="establisher_code"
            label="Код підрозділу, що видав"
            value={params.passportData.establisher_code}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.passportData,
                establisher_code: Number(event.target.value),
              })
            }
            InputProps={{ inputProps: { min: 0, max: 10000 } }}
            fullWidth
            type="text"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
