import { Amplify } from 'aws-amplify';
import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import awsExports from 'src/auth/aws-exports'; // Ensure this has correct Cognito config
import App from './app';
import { CONFIG } from './config-global';

// ✅ Configure Amplify with AWS Cognito credentials
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={CONFIG.site.basePath}>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
