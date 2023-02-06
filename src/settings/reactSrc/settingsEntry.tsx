import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

ReactDOMClient.createRoot(document.getElementById('settingsRoot') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
