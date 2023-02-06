import React, { type MouseEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { getBioAndMessagesFromScreen, messagesToConversationalText } from './crawling/crawling';
import openAiRequest from './openAi/openAiRequest';
import ChoiceModal from './sections/ChoiceModal';
import { useAtom } from 'jotai';
import storedInfoAtom from '../atoms/sotredInfo';
import { DEFAULT_INTEROCUTOR_NAME, DEFAULT_MY_NAME, DEFAULT_USER_PROMPT } from '../defaultValues/defaultValues';

export default function App() {
    const [storedInfo, setStoredInfo] = useAtom(storedInfoAtom);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [choices, setChoices] = useState<string[]>([]);
    const [isGPTLoading, setIsGPTLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        chrome.storage.sync.get(['MY_NAME', 'INTERLOCUTOR_NAME', 'USER_PROMPT'], (syncData) => {
            const { MY_NAME, INTERLOCUTOR_NAME, USER_PROMPT } = syncData;
            setStoredInfo({
                myName: MY_NAME || DEFAULT_MY_NAME,
                interlocutorName: INTERLOCUTOR_NAME || DEFAULT_INTEROCUTOR_NAME,
                userPrompt: USER_PROMPT || DEFAULT_USER_PROMPT,
            });
            setIsLoaded(true);
        });
    }, []);

    async function onClickActionButton(event: MouseEvent<HTMLButtonElement>) {
        if (!chrome.storage) {
            alert('Please use this extension in Chrome browser, or try reloading');
            return;
        }
        event.preventDefault();
        event.stopPropagation();

        const prompt = await _generatePrompt();
        console.info('prompt: \n', prompt);

        setIsGPTLoading(true);
        chrome.storage.sync.get(['OPENAI_API_KEY'], async (syncData) => {
            if (!syncData.OPENAI_API_KEY) {
                alert('Please set your API key in the settings page');
                return;
            }
            try {
                const { OPENAI_API_KEY } = syncData;
                const data = await openAiRequest(prompt, OPENAI_API_KEY);
                const _choices = JSON.parse(data.choices[0].text.concat(']'));
                console.info('🚀 ~ file: App.tsx:31 ~ chrome.storage.sync.get ~ _choices', _choices);

                setChoices(_choices);
                setIsGPTLoading(false);
                setIsModalVisible(true);
            } catch (error) {
                console.error(error);
                alert('GPT error, check your API key and retry later.');
                setIsGPTLoading(false);
            }
        });
    }

    if (!isLoaded) return null;
    return (
        <_AppOutermost>
            <ChoiceModal isVisible={isModalVisible} onRequestClose={() => setIsModalVisible(false)} choices={choices} />
            <_ActionButton onClick={onClickActionButton} disabled={isGPTLoading}>
                {isGPTLoading ? '...' : 'GPT'}
            </_ActionButton>
        </_AppOutermost>
    );

    async function _generatePrompt() {
        const { myName, interlocutorName, userPrompt } = storedInfo;
        const { bio, messages } = await getBioAndMessagesFromScreen({ myName, interlocutorName });
        const MAX_TOKEN_LENGTH = 1024 - 256; // give some safe space for the prompt and the response

        const conversationText = messagesToConversationalText({ messages, maxTokenLength: MAX_TOKEN_LENGTH, myName, interlocutorName });

        const postPrompt = `Considering that they are online dating, what would ${myName} say next? Make 5 responses that have different topics from each other,  in javascript array format. Write down the array only. Make the responses as long as possible.`;
        const wholePrompt = [conversationText, , userPrompt || '', postPrompt].join('\n');
        return wholePrompt;
    }
}

const _AppOutermost = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const _ActionButton = styled.button<{ disabled: boolean }>`
    height: 36px;
    width: 42px;

    background-color: ${(props) => (props.disabled ? 'lightGray' : '#ffc0cb88')};

    color: #00000088;

    border-radius: 12px;
    text-overflow: clip;
    overflow: hidden;
    :hover {
        background-color: ${(props) => (props.disabled ? 'lightGray' : '#ffc0cbff')};
        color: #000000ff;
    }
`;
