import { createMuiTheme } from '@material-ui/core/styles';

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';


export const theme = createMuiTheme({
    palette: {
      primary: {
        main: orange[700],
      },
      secondary: {
        main: green[500],
      },
    },
  });