import '@fontsource/source-sans-3/300.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/600.css';
import '@fontsource/work-sans/300.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/500.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/500.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '~/routes';
import { grataTheme, grataThemeDark } from '~/theme/grata/theme';
import { ThemeModeProvider, useThemeMode } from '~/theme/ThemeModeContext';

const ThemedRouter = () => {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={mode === 'dark' ? grataThemeDark : grataTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

const App = () => (
  <ThemeModeProvider>
    <ThemedRouter />
  </ThemeModeProvider>
);

const mount = (el: HTMLElement) => {
  const root = createRoot(el);
  root.render(<App />);
  return () => root.unmount();
};

export { mount };
export default App;
