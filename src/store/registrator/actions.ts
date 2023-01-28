import { Dispatch } from '@reduxjs/toolkit';
import { UserRole } from 'src/common/enums/app/role.enum';
import { UserFilter } from 'src/interfaces/Filters';
import { User } from 'src/interfaces/services/models/User';
import { UserService } from 'src/services/user/UserService';
import { uiActions } from 'src/store/ui/slice';
import { registrarActions } from './slice';

export const fetchRegistrarsData =
  (filter: UserFilter) => (dispatch: Dispatch) =>
    UserService.getAllUsers({ role: UserRole.REGISTRATOR, ...filter })
      .then((data) =>
        dispatch(
          registrarActions.setRegistors({
            registrars: data.entities,
            page: filter.page,
            count: filter.per_page,
            totalPages: Math.ceil(data.count / filter.per_page),
            totalCount: data.count,
          }),
        ),
      )
      .catch((error) => {
        console.log(error);
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: `Помилка! ${error.data.error}`,
          }),
        );
      });

export const createNewRegistrar =
  (record: User, pass: string) => (dispatch: Dispatch) =>
    UserService.createUser({
      role: UserRole.REGISTRATOR,
      pass: pass,
      user: record,
    })
      .then((data) =>
        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Реєстратора було додано!',
          }),
        ),
      )
      .catch((error) => {
        console.log(error);

        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: `Помилка! ${error.data.error || error.data.message}`,
          }),
        );
      });

export const getRegistratorById =
  (id: number) =>
  async (dispatch: Dispatch): Promise<User | undefined> => {
    try {
      const res = await UserService.getUserById({
        id,
        role: UserRole.REGISTRATOR,
      });
      return res;
    } catch (error: any) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: `Помилка! ${error.data.error}`,
        }),
      );
    }
  };

export const updateRegistrator =
  (record: User, pass?: string) => (dispatch: Dispatch) =>
    UserService.updateUser({ role: UserRole.REGISTRATOR, user: record, pass })
      .then((data) =>
        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Дані про Реєстратора було змінено!',
          }),
        ),
      )
      .catch((error) => {
        console.log(error);

        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Виникла помилка при внесені змін!',
          }),
        );
      });

export const setStatusById =
  (record: User, status: boolean) => (dispatch: Dispatch) =>
    UserService.updateUser({
      role: UserRole.REGISTRATOR,
      user: { ...record, is_enable: status },
    }).then((data) =>
      dispatch(
        registrarActions.setStatusById({ id: record.id as number, status }),
      ),
    );
