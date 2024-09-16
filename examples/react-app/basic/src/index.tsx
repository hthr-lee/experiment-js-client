import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Experiment } from '@amplitude/experiment-js-client';
import { createClient } from 'contentful';

/**
 * Initialize the Amplitude Experiment SDK and export the initialized client.
 */
export const experiment = Experiment.initialize(
  'REDACTED',
  { debug: true },
);

export const contentfulClient = createClient({
  // space: '55cride99ug6',
  space: 'tnsf3artiq0f',
  accessToken: 'REDACTED',
  // transformResponse: {},
  // adapter: customAdapter,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
