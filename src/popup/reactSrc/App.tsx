import React from 'react';
import styled from 'styled-components';

declare const chrome: any;

export default function App() {
    return (
        <_AppOutermost>
            <_TitleText>GPTinder</_TitleText>
            <_SettingButton
                onClick={() => {
                    chrome.tabs.create({ url: './dist/settings.html' });
                }}
            >
                open settings
            </_SettingButton>
        </_AppOutermost>
    );
}

const _AppOutermost = styled.div`
    width: 240px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;

    gap: 24px;
    padding: 16px;
`;

const _TitleText = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const _SettingButton = styled.button`
    align-self: center;

    width: 80%;
    height: 60px;
    background-color: lightgray; /* Green */
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    border-radius: 40px;

    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
`;
