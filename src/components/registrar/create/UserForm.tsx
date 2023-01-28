import * as React from 'react';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { RegistrarData } from './Data';

export const UserForm = (params: {
  onChange: (regisrarData: RegistrarData) => void;
  registrarData: RegistrarData;
}) => {
  const [showPassword, handleClickShowPassword] = React.useState(false);

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
            value={params.registrarData.fullname}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.registrarData,
                fullname: event.target.value,
              })
            }
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            variant="standard"
            value={params.registrarData.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.registrarData,
                email: event.target.value,
              })
            }
          />

          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-password" required>
              Пароль
            </InputLabel>
            <Input
              id="standard-adornment-password"
              autoComplete="new-password"
              type={showPassword ? 'text' : 'password'}
              value={params.registrarData.pass}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                params.onChange({
                  ...params.registrarData,
                  pass: event.target.value,
                })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword(!showPassword)}
                    onMouseDown={(
                      event: React.MouseEvent<HTMLButtonElement>,
                    ) => {
                      event.preventDefault();
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            required
            fullWidth
            name="organization"
            label="Організація"
            id="organization"
            variant="standard"
            value={params.registrarData.organization}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.registrarData,
                organization: event.target.value,
              })
            }
          />
          <TextField
            required
            fullWidth
            name="position"
            label="Посада"
            id="position"
            variant="standard"
            value={params.registrarData.position}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.registrarData,
                position: event.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="date"
            name="date"
            label="Дата народження"
            value={params.registrarData.date_of_birth}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.registrarData,
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
            value={params.registrarData.taxpayer_code}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              params.onChange({
                ...params.registrarData,
                taxpayer_code: event.target.value,
              })
            }
            inputProps={{ maxLength: 10 }}
            fullWidth
            type="number"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
