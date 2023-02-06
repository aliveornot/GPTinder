import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputUnit from '../../components/inputUnit';
import TextAreaUnit from '../../components/textAreaUnit';
import { DEFAULT_API_KEY, DEFAULT_INTEROCUTOR_NAME, DEFAULT_MY_NAME, DEFAULT_USER_PROMPT } from '../../defaultValues/defaultValues';

export default function SettingsApp() {
    const [apiKey, setApiKey] = useState('');
    const [userPrompt, setUserPrompt] = useState('');
    const [myName, setMyName] = useState('');
    const [interlocutorName, setInterlocutorName] = useState('');

    function onChangeApiKey(newValue: string) {
        chrome.storage.sync.set({ OPENAI_API_KEY: newValue || DEFAULT_API_KEY });
        setApiKey(newValue || DEFAULT_API_KEY);
    }
    function onChangeUserPrompt(newValue: string) {
        chrome.storage.sync.set({ USER_PROMPT: newValue || DEFAULT_USER_PROMPT });
        setUserPrompt(newValue || DEFAULT_USER_PROMPT);
    }
    function onChangeMyName(newValue: string) {
        chrome.storage.sync.set({ MY_NAME: newValue || DEFAULT_MY_NAME });
        setMyName(newValue || DEFAULT_MY_NAME);
    }
    function onChangeInterlocutorName(newValue: string) {
        chrome.storage.sync.set({ INTERLOCUTOR_NAME: newValue || DEFAULT_INTEROCUTOR_NAME });
        setInterlocutorName(newValue || DEFAULT_INTEROCUTOR_NAME);
    }

    useEffect(() => {
        chrome.storage.sync.get(['OPENAI_API_KEY', 'MY_NAME', 'INTERLOCUTOR_NAME', 'USER_PROMPT'], (result) => {
            setApiKey(result.OPENAI_API_KEY || DEFAULT_API_KEY);
            setMyName(result.MY_NAME || DEFAULT_MY_NAME);
            setInterlocutorName(result.INTERLOCUTOR_NAME || DEFAULT_INTEROCUTOR_NAME);
            setUserPrompt(result.PRE_PROMPT || DEFAULT_USER_PROMPT);
        });
    }, []);

    return (
        <_SettingAppOutermost>
            <_SettingsTitle>Settings</_SettingsTitle>
            <_SettingsBody>
                <InputUnit label='OpenAI API Key (REQUIRED)' placeholder='API key' value={apiKey} onChange={onChangeApiKey}>
                    <_Description>
                        Make an openAI account, and visit.
                        <a href={'https://platform.openai.com/account/api-keys'}>https://platform.openai.com/account/api-keys</a> to get the key.
                        REQUIRED.
                    </_Description>
                </InputUnit>
                <TextAreaUnit label='user-defined prompt before conversation' placeholder='prompt' value={userPrompt} onChange={onChangeUserPrompt}>
                    <_Description>
                        Text added right after the conversation. This is customizable for the sake of prompt engineering. Leave it default unless you
                        know what you're doing.{' '}
                    </_Description>
                </TextAreaUnit>
                <InputUnit label='my name' placeholder='my name' value={myName} onChange={onChangeMyName}>
                    <_Description>
                        Your name. This is customizable for the sake of prompt engineering. Leave it default unless you know what you're doing. You
                        can check the console to see how the whole prompt is generated.(default: empty)
                    </_Description>
                </InputUnit>
                <InputUnit label='interlocutor name' placeholder='interlocutor name' value={interlocutorName} onChange={onChangeInterlocutorName}>
                    <_Description>
                        The name of the person you are talking to. This is customizable for the sake of prompt engineering. Leave it default unless
                        you know what you're doing. (default: Alice)
                    </_Description>
                </InputUnit>
            </_SettingsBody>
        </_SettingAppOutermost>
    );
}

const _SettingAppOutermost = styled.div`
    background-color: #f0f0f0;
    height: 100%;
    width: 100%;
    font-size: 1.6em;
`;

const _SettingsTitle = styled.h1`
    color: #000000;
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.5em;
`;

const _SettingsBody = styled.div`
    margin: 0.5em;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    gap: 16px;
`;

const _Description = styled.div`
    color: #000000;
    font-size: 0.8em;
`;
