import * as React from 'react';
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { DocType } from 'src/common/enums/app/doc-type.enum';
import { DocData } from './Data';

export default function DocForm(params: {
  onChange: (personData: DocData) => void;
  docData: DocData;
}) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="code"
            name="code"
            label="Номер бланку"
            value={params.docData.blanks_numbers}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.docData,
                blanks_numbers: Number(event.target.value),
              })
            }
            fullWidth
            type="number"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="birthday"
            name="birthday"
            label="Дата реєстрації"
            value={params.docData.sertificating_date}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.docData,
                sertificating_date: event.target.value,
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
          <Typography variant="h6" gutterBottom>
            Місце реєстрації
          </Typography>
          <TextField
            required
            id="address1"
            name="address1"
            label="Адресний рядок 1"
            value={params.docData.sertificating_place.line_1}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.docData,
                sertificating_place: {
                  ...params.docData.sertificating_place,
                  line_1: event.target.value,
                },
              })
            }
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
          <TextField
            id="address2"
            name="address2"
            label="Адресний рядок 2"
            value={params.docData.sertificating_place.line_2}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.docData,
                sertificating_place: {
                  ...params.docData.sertificating_place,
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
            id="country"
            name="country"
            label="Країна"
            value={params.docData.sertificating_place.country}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.docData,
                sertificating_place: {
                  ...params.docData.sertificating_place,
                  country: event.target.value,
                },
              })
            }
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Тип документа</FormLabel>
            <RadioGroup
              aria-label="gender"
              value={params.docData.type}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                params.onChange({
                  ...params.docData,
                  type: Number(event.target.value),
                })
              }
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label={DocType.WILL}
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label={DocType.MCW}
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label={DocType.SWILL}
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label={DocType.INHAGR}
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label={DocType.INHARTOMC}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
