import { CssBaseline, GlobalStyles } from '@mui/material';
import React from 'react';
import RegistryTable from 'src/components/registry/RegistryTable';

export const RegistrarHome = () => {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <RegistryTable />
    </React.Fragment>
  );
};
