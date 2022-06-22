import { createTheme } from '@mui/material';

import { palette } from './palette';

export const theme = createTheme({
  palette: palette,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});
