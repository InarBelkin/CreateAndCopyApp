import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import MainWindow from './components/main-window/main-window';
import appTheme from './styles/AppTheme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline>
        <Router>
          <Routes>
            <Route path="/" element={<MainWindow />} />
          </Routes>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}
