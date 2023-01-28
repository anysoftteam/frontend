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
import PersonForm from './PersonForm';
import DocForm from './DocForm';
import Review from './Review';
import { DocData, PersonData } from './Data';
import { StorageKey } from 'src/common/enums/storage-key.enum';
import { useTypedDispatch } from 'src/store';
import { createNewRegistry } from 'src/store/registry/actions';

const steps = [
  'Відомості про Заповідача / Відчужувача',
  'Відомості про документ',
  'Створення',
];

const theme = createTheme();

const initialPesonState: PersonData = {
  taxpayer_code: '',
  fullname: '',
  place_of_living: {
    country: '',
    line_1: '',
    line_2: '',
  },
  place_of_birth: {
    country: '',
    line_1: '',
    line_2: '',
  },
  date_of_birth: '',
};

const initialDocState: DocData = {
  type: 0,
  blanks_numbers: 0,
  notarial_action_id: 1,
  sertificated_by:
    JSON.parse(localStorage.getItem(StorageKey.USER) || 'null')?.userId || 1,
  sertificating_date: '',
  sertificating_place: {
    country: '',
    line_1: '',
    line_2: '',
  },
};

export function CreateRegistry() {
  const dispatch = useTypedDispatch();

  const [activeStep, setActiveStep] = React.useState(0);

  const [person, setPersonData] = React.useState<PersonData>(initialPesonState);
  const [doc, setDocData] = React.useState<DocData>(initialDocState);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePerson = React.useCallback(
    (personData: PersonData) => setPersonData(personData),
    [],
  );

  const handleDoc = React.useCallback(
    (docDate: DocData) => setDocData(docDate),
    [],
  );

  const handleCreation = React.useCallback(
    () =>
      dispatch(
        createNewRegistry({
          ...doc,
          sertificating_place: { ...doc.sertificating_place },
          person: { ...person },
        }),
      ),
    [dispatch, doc, person],
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonForm onChange={handlePerson} personData={person} />;
      case 1:
        return <DocForm onChange={handleDoc} docData={doc} />;
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
            Додавання документа
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
                  Очікуйте сповіщення про статус виконання операції внесення
                  нових відомостей про документ.
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
                      ? 'Створити документ'
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
}
