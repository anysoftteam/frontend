import * as React from 'react';
import './App.css';
import SignIn from 'src/pages/Login';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { AppRoute } from 'src/common/enums/app-route.enum';
import { AdminHome, RegistrarHome } from 'src/pages';
import { useTypedDispatch, useTypedSelector } from 'src/store';
import { Header } from 'src/components/navigation/Header';
import { selectNotification, uiActions } from 'src/store/ui/slice';
import { getUser } from './store/user/slice';
import { Alert, Snackbar } from '@mui/material';
import { UserRole } from './common/enums/app/role.enum';
import { NotFound } from './components/not-found/NotFound';
import { CreateRegistry } from './components/registry/create/CreateRegistry';
import { UpdateRegistry } from './components/registry/create/update/UpdateForm';
import { logout } from './store/user/actions';
import { CreateRegistrar } from './components/registrar/create/CreateRegistrar';
import { UpdateRegigtrator } from './components/registrar/create/update/UpdateForm';

function App() {
  const notification = useTypedSelector(selectNotification);

  const user = useTypedSelector(getUser);

  const dispatch = useTypedDispatch();

  const handleClose = () => {
    dispatch(uiActions.clearNotification());
  };

  const handleUserLogout = React.useCallback(
    () => dispatch(logout()),
    [dispatch],
  );

  const notify = () => {
    if (notification) {
      const { status, message } = notification;

      return (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      );
    } else return null;
  };

  const notice = notify();

  return (
    <Router>
      <>
        {user.userId !== null && (
          <Header role={user.role} onLogout={handleUserLogout} />
        )}
        {notice}

        <Switch>
          <Route exact path={AppRoute.LOGIN} component={SignIn} />
          <Route exact path={AppRoute.NOT_FOUND} component={NotFound} />

          {user.role === UserRole.REGISTRATOR && (
            <>
              <Route exact path={AppRoute.ROOT} component={RegistrarHome} />
              <Route
                exact
                path={AppRoute.UPDATE_REGISTRY}
                render={({ match }) => (
                  <UpdateRegistry id={Number(match.params.id)} />
                )}
              />
              <Route exact path={AppRoute.CREATE} component={CreateRegistry} />
            </>
          )}

          {user.role === UserRole.ADMIN && (
            <>
              <Route exact path={AppRoute.ROOT} component={AdminHome} />
              <Route exact path={AppRoute.CREATE} component={CreateRegistrar} />
              <Route exact path={AppRoute.REGISTRY} component={RegistrarHome} />
              <Route
                exact
                path={AppRoute.UPDATE_REGISTRATOR}
                render={({ match }) => (
                  <UpdateRegigtrator id={Number(match.params.id)} />
                )}
              />
            </>
          )}
          {user.role === null && (
            <>
              <Redirect exact from={AppRoute.ANY} to={AppRoute.LOGIN} />
            </>
          )}
          <Route path={AppRoute.ANY}>
            <Redirect to={AppRoute.NOT_FOUND} />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
