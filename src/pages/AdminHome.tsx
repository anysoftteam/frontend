import { CssBaseline, GlobalStyles } from '@mui/material';
import React from 'react';
import { RegistrarTable } from 'src/components/registrar/RegistrarTable';

export const AdminHome = () => {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <RegistrarTable />
    </React.Fragment>
  );
};
