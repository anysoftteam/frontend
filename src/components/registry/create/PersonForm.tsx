import * as React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { PersonData } from './Data';

export default function PersonForm(params: {
  onChange: (personData: PersonData) => void;
  personData: PersonData;
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Персональні дані
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="ПІБ"
            value={params.personData.fullname}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.personData,
                fullname: event.target.value,
              })
            }
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="date"
            name="date"
            label="Дата народження"
            value={params.personData.date_of_birth}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.personData,
                date_of_birth: event.target.value,
              })
            }
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="code"
            name="code"
            label="Податковий номер"
            value={params.personData.taxpayer_code}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.personData,
                taxpayer_code: event.target.value,
              })
            }
            fullWidth
            type="number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Місце народження
          </Typography>
          <TextField
            required
            id="address11"
            name="address"
            label="Адресний рядок 1"
            value={params.personData.place_of_birth.line_1}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.personData,
                place_of_birth: {
                  ...params.personData.place_of_birth,
                  line_1: event.target.value,
                },
              })
            }
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
          <TextField
            id="address12"
            name="address"
            label="Адресний рядок 2"
            value={params.personData.place_of_birth.line_2}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.personData,
                place_of_birth: {
                  ...params.personData.place_of_birth,
                  line_2: event.target.value,
                },
              })
            }
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
          <TextField
            required
            id="country1"
            name="country"
            label="Країна"
            value={params.personData.place_of_birth.country}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.personData,
                place_of_birth: {
                  ...params.personData.place_of_birth,
                  country: event.target.value,
                },
              })
            }
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Місце реєстрації
          </Typography>
          <TextField
            required
            id="address12"
            name="address"
            label="Адресний рядок 1"
            value={params.personData.place_of_living.line_1}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.personData,
                place_of_living: {
                  ...params.personData.place_of_birth,
                  line_1: event.target.value,
                },
              })
            }
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
          <TextField
            id="address22"
            name="address"
            label="Адресний рядок 2"
            value={params.personData.place_of_living.line_2}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.personData,
                place_of_living: {
                  ...params.personData.place_of_birth,
                  line_2: event.target.value,
                },
              })
            }
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
          <TextField
            required
            id="country2"
            name="country"
            label="Країна"
            value={params.personData.place_of_living.country}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.personData,
                place_of_living: {
                  ...params.personData.place_of_birth,
                  country: event.target.value,
                },
              })
            }
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
