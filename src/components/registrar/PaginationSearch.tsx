import * as React from 'react';
import { Grid, Box, Stack, Button } from '@mui/material';
import { UserFilter } from 'src/interfaces/Filters';

export const PaginationSearch = (props: {
  onSearch: (searchData: UserFilter) => void;
}) => {
  const handleSearch = () => {
    props.onSearch({
      page: 0,
      per_page: 0,
    });
  };

  return (
    <Box
      sx={{
        width: '100wh',
        mx: 'auto',
        p: 3,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 1 }}
        ></Stack>
      </Grid>
      <Box textAlign="center" sx={{ p: 2 }}>
        <Button variant="outlined" onClick={handleSearch}>
          Пошук
        </Button>
      </Box>
    </Box>
  );
};
