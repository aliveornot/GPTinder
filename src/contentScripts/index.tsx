import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';

declare global {
    var theButton: HTMLButtonElement | undefined;
    var textInput: HTMLTextAreaElement | undefined | null;
}

let previousUrl = '';

function renderApp() {
    try {
        const inputTextArea = document.querySelector('textArea') as HTMLElement;
        const buttonRegion = document.createElement('button');
        buttonRegion.id = 'gptinderButtonRegion';
        (inputTextArea.parentElement as HTMLElement).insertBefore(buttonRegion, inputTextArea);

        ReactDOMClient.createRoot(buttonRegion).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );

        return buttonRegion;
    } catch (e) {
        console.log('na ah');
    }
}

function restartApp() {
    if (globalThis.theButton) {
        globalThis.theButton.remove();
        globalThis.textInput = null;
        globalThis.theButton = renderApp();
        globalThis.textInput = document.querySelector('textArea') as HTMLTextAreaElement;
    }
}

const observer = new MutationObserver(function (mutations) {
    if (location.href !== previousUrl && /app\/message/.test(location.href)) {
        previousUrl = location.href;
        setTimeout(restartApp, 200);
    }
});

observer.observe(document, { subtree: true, childList: true });

setInterval(() => {
    if (!globalThis.theButton) {
        globalThis.theButton = renderApp();
        globalThis.textInput = document.getElementsByTagName('textarea')[0];
    }
}, 2000);

window.addEventListener('resize', () => {
    if (globalThis.theButton) {
        globalThis.theButton.remove();
        globalThis.textInput = null;
    }
    globalThis.theButton = renderApp();
    globalThis.textInput = document.querySelector('textArea') as HTMLTextAreaElement;
});
