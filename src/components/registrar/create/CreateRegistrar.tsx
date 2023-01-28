import * as React from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  CssBaseline,
  Box,
  Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserForm } from './UserForm';
import { PassportForm } from './PassportForm';
import { Review } from './Review';
import { RegistrarData, PassportData } from './Data';
import { useTypedDispatch } from 'src/store';
import { createNewRegistrar } from 'src/store/registrator/actions';

const steps = ['Відомості про Реєстратора', 'Паспортні відомості', 'Створення'];

const theme = createTheme();

const initialUserState: RegistrarData = {
  fullname: '',
  email: '',
  date_of_birth: '',
  organization: '',
  position: '',
  taxpayer_code: '',
  pass: '',
};

const initialPassportState: PassportData = {
  code: '',
  series: '',
  date_of_establishing: '',
  establisher_code: 0,
};

export const CreateRegistrar = () => {
  const dispatch = useTypedDispatch();

  const [activeStep, setActiveStep] = React.useState(0);
  const [user, setUserData] = React.useState<RegistrarData>(initialUserState);
  const [passport, setPassportData] =
    React.useState<PassportData>(initialPassportState);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleUser = React.useCallback(
    (regisrarData: RegistrarData) => setUserData(regisrarData),
    [],
  );

  const handlePassport = React.useCallback(
    (passportData: PassportData) => setPassportData(passportData),
    [],
  );

  const handleCreation = React.useCallback(
    () =>
      dispatch(
        createNewRegistrar(
          {
            ...user,
            passport,
          },
          user.pass,
        ),
      ),
    [dispatch, passport, user],
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserForm onChange={handleUser} registrarData={user} />;
      case 1:
        return (
          <PassportForm onChange={handlePassport} passportData={passport} />
        );
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Реєстрація Реєстратора
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Інформацію буде відправлено на оброку
                </Typography>
                <Typography variant="subtitle1">
                  Очікуйте сповіщення про статус виконання операції додавання
                  Реєстратора.
                </Typography>
                <Button variant="outlined" onClick={handleCreation}>
                  Створити
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Назад
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? 'Створити Реєстратора'
                      : 'Далі'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};
