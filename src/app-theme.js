import {
 grey, amber, brown, deepPurple 
} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import spacing from '@material-ui/core/styles/spacing';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  spacing,
  palette: {
    type: 'dark',
    primary: amber,
    secondary: brown,
    background: {
      default: '#303030',
      paper: grey[800],
      header: grey[700],
      highlight: grey[700],
      light: grey[500],
      accent: deepPurple.A700,
    },
  },
});
