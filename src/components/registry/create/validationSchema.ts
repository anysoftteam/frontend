import * as yup from 'yup';

const ERROR_REQUIRED = 'Поле обов’язкове';
const WRONG_FORMAT = 'Неправильний формат';

export const validationRegistrySchema = yup.object().shape({
  taxpayer_code: yup
    .string()
    .required(ERROR_REQUIRED)
    .length(10, 'Має бути 10 символи')
    .matches(/[0-9]{10}/, WRONG_FORMAT),

  fullname: yup
    .string()
    .required(ERROR_REQUIRED)
    .min(6, 'Має бути більше 6 символів')
    .max(30),

  country_l: yup.string().required(ERROR_REQUIRED),
  country_b: yup.string().required(ERROR_REQUIRED),
  country_s: yup.string().required(ERROR_REQUIRED),

  line_1l: yup.string().required(ERROR_REQUIRED),
  line_1b: yup.string().required(ERROR_REQUIRED),
  line_1s: yup.string().required(ERROR_REQUIRED),

  line_2b: yup.string().required(ERROR_REQUIRED),
  line_2l: yup.string().required(ERROR_REQUIRED),
  line_2s: yup.string().required(ERROR_REQUIRED),

  date_of_birth: yup
    .date()
    .required(ERROR_REQUIRED)
    .max(new Date(), WRONG_FORMAT),

  sertificating_date: yup
    .date()
    .required(ERROR_REQUIRED)
    .max(new Date(), WRONG_FORMAT),

  email: yup
    .string()
    .required(ERROR_REQUIRED)
    .email('Повинна бути дійсна електронна адреса'),

  series_passport: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/[A-Z]{2}/, {
      excludeEmptyString: true,
      message: WRONG_FORMAT,
    }),

  date_of_issue_of_passport: yup
    .date()
    .required(ERROR_REQUIRED)
    .when(
      'date_of_birth',
      (date_of_birth, yup) =>
        date_of_birth &&
        yup.min(
          new Date(date_of_birth),
          'Дата видачі паспорта не може бути меншою за дату народження',
        ),
    )
    .when(
      'date_of_birth',
      (date_of_birth, yup) =>
        date_of_birth &&
        yup.max(
          new Date(
            new Date(date_of_birth).getFullYear() + 18,
            new Date(date_of_birth).getMonth(),
            new Date(date_of_birth).getDate(),
          ),
          'Дата видачі паспорта не може бути більшою 18 років після народження',
        ),
    ),

  id_authority_that_issued_the_passport: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string(),
        id: yup.number(),
      }),
    )
    .nullable()
    .length(1, ERROR_REQUIRED),

  passport_number: yup
    .string()
    .required(ERROR_REQUIRED)
    .length(9, 'Має бути 9 символи')
    .matches(/[0-9]{9}/, WRONG_FORMAT),

  id_organizations: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string(),
        id: yup.number(),
      }),
    )
    .nullable()
    .length(1, ERROR_REQUIRED),

  id_position: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string(),
        id: yup.number(),
      }),
    )
    .nullable()
    .length(1, ERROR_REQUIRED),

  region: yup.string().required(ERROR_REQUIRED),

  city: yup.string().required(ERROR_REQUIRED),

  street: yup.string().required(ERROR_REQUIRED),

  house_number: yup.string().required(ERROR_REQUIRED),

  flat_number: yup.string().nullable().notRequired(),
});
