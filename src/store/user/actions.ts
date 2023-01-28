import { Dispatch } from '@reduxjs/toolkit';
import { UserRole } from 'src/common/enums/app/role.enum';
import { StorageKey } from 'src/common/enums/storage-key.enum';
import { UserService } from 'src/services/user/UserService';
import { uiActions } from 'src/store/ui/slice';
import { userActions } from './slice';

export const login =
  (request: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await UserService.login(request.email, request.password);
      localStorage.setItem(StorageKey.TOKEN, res.token);
      localStorage.setItem(StorageKey.USER, JSON.stringify(res.user));

      dispatch(
        userActions.setUser({
          userId: res.user.id,
          role: (res.user.role as UserRole) || null,
        }),
      );

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: `Користувач увійшов`,
        }),
      );
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

export const logout = () => (dispatch: Dispatch) => {
  localStorage.clear();
  dispatch(userActions.setUser({ userId: null, role: null }));
  dispatch(
    uiActions.showNotification({
      status: 'info',
      title: 'Logout',
      message: 'User logged out',
    }),
  );
};
