import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Review } from '../Review';
import { RegistrarData, PassportData } from '../Data';
import { useTypedDispatch } from 'src/store';
import {
  getRegistratorById,
  updateRegistrator,
} from 'src/store/registrator/actions';
import { UserForm } from '../UserForm';
import { PassportForm } from '../PassportForm';
import dayjs from 'dayjs';

const steps = [
  'Відомості про Реєстратора',
  'Паспортні відомості',
  'Редагування',
];

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

export const UpdateRegigtrator = (props: { id: number }) => {
  const dispatch = useTypedDispatch();

  const [activeStep, setActiveStep] = React.useState(0);

  const [user, setUserData] = React.useState<RegistrarData>(initialUserState);
  const [passport, setPassportData] =
    React.useState<PassportData>(initialPassportState);

  React.useEffect(() => {
    async function fetchData() {
      const res = await dispatch(getRegistratorById(props.id));
      console.log(res, 'dispatch');

      if (res) {
        setUserData({
          pass: '',
          ...res,
          date_of_birth: dayjs(res.date_of_birth).format('YYYY-MM-DD'),
        });
        setPassportData({
          ...res.passport,
          date_of_establishing: dayjs(res.passport.date_of_establishing).format(
            'YYYY-MM-DD',
          ),
        });
      }
    }
    fetchData();
  }, [dispatch, props.id]);

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

  const handleUpdate = React.useCallback(
    () =>
      dispatch(
        updateRegistrator(
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
            Редагування Реєстратора
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
                  Очікуйте сповіщення про статус виконання операції редагування
                  відомостей про Реєстратора.
                </Typography>
                <Button variant="outlined" onClick={handleUpdate}>
                  Редагувати
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
                    {activeStep === steps.length - 1 ? 'Редагувати' : 'Далі'}
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
