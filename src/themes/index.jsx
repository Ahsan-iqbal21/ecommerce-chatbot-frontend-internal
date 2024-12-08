import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import Typography from './typography';
import ComponentsOverrides from './overrides';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({ children }) {

  const themeTypography = Typography(`'Inter', sans-serif`);

  const themeOptions = useMemo(
    () => ({
      typography: themeTypography
    }),
    [themeTypography]
  );

  const themes = createTheme(themeOptions);
  themes.components = ComponentsOverrides(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node
};
