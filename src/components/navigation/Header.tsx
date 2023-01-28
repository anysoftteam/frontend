import {
  AppBar,
  Button,
  CssBaseline,
  GlobalStyles,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { AppRoute } from 'src/common/enums/app-route.enum';
import { UserRole } from 'src/common/enums/app/role.enum';
import { useHistory } from 'react-router-dom';

export function Header(params: {
  role: UserRole | null;
  onLogout: () => void;
}) {
  const history = useHistory();

  const exit = () => {
    localStorage.clear();
    history.replace(AppRoute.LOGIN);
    params.onLogout();
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {'Спадковий реєстр'}
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href={AppRoute.ROOT}
              sx={{ my: 1, mx: 1.5 }}
            >
              Головна
            </Link>
            {params.role === UserRole.REGISTRATOR && (
              <Link
                variant="button"
                color="text.primary"
                href={AppRoute.CREATE}
                sx={{ my: 1, mx: 1.5 }}
              >
                Створити новий документ
              </Link>
            )}

            {params.role === UserRole.ADMIN && (
              <Link
                variant="button"
                color="text.primary"
                href={AppRoute.CREATE}
                sx={{ my: 1, mx: 1.5 }}
              >
                Створити нового реєстратора
              </Link>
            )}

            {params.role === UserRole.ADMIN && (
              <Link
                variant="button"
                color="text.primary"
                href={AppRoute.REGISTRY}
                sx={{ my: 1, mx: 1.5 }}
              >
                Відомості про документи
              </Link>
            )}
          </nav>
          <Button onClick={exit} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Вихід
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
