import 'src/global.css';

// ----------------------------------------------------------------------

import type { PublicClientApplication } from '@azure/msal-browser';

import { MsalProvider } from '@azure/msal-react';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { LocalizationProvider } from 'src/locales';
import { I18nProvider } from 'src/locales/i18n-provider';
import { ThemeProvider } from 'src/theme/theme-provider';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

// ----------------------------------------------------------------------

interface MsalInstance {
  instance: PublicClientApplication;
}

export default function App({ instance }: MsalInstance) {
  useScrollToTop();

  return (
    <I18nProvider>
      <LocalizationProvider>
        <MsalProvider instance={instance}>
          <SettingsProvider settings={defaultSettings}>
            <ThemeProvider>
              <MotionLazy>
                <Snackbar />
                <ProgressBar />
                <SettingsDrawer />
                <Router />
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </MsalProvider>
      </LocalizationProvider>
    </I18nProvider>
  );
}
