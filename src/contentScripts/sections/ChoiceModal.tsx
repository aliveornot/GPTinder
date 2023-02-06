import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ChoiceModal({ isVisible, onRequestClose, choices }: { isVisible: boolean; onRequestClose: () => void; choices?: string[] }) {
    console.log('choices in choiceModal', choices);
    return isVisible ? (
        <>
            <_ModalBackdrop onClick={onRequestClose}>
                {choices?.map((choice) => {
                    return <Choice defaultText={choice} onModalRequestClose={onRequestClose} />;
                })}
            </_ModalBackdrop>
        </>
    ) : null;
}

function Choice({ defaultText, onModalRequestClose }: { defaultText: string; onModalRequestClose: () => void }) {
    const [userInputAreaOfTinder, setUserInputAreaOfTinder] = React.useState<HTMLTextAreaElement | null>(null);
    const [text, setText] = useState(defaultText);

    useEffect(() => {
        setUserInputAreaOfTinder(document.querySelector('textarea'));
    });

    function onClickSendButton() {
        if (userInputAreaOfTinder) {
            //change anc update text
            userInputAreaOfTinder.value = text;
            const event = new Event('change', { bubbles: true });
            userInputAreaOfTinder.dispatchEvent(event);

            //focus and cursor to the end
            userInputAreaOfTinder.focus();
            const event2 = new KeyboardEvent('keydown', { bubbles: true, key: 'End', code: 'End' });
            userInputAreaOfTinder.dispatchEvent(event2);
        }
        onModalRequestClose();
    }

    return (
        <_ChoiceOutermost
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClickSendButton();
            }}
        >
            {text}
        </_ChoiceOutermost>
    );
}

const _ModalBackdrop = styled.div`
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
`;

const _ChoiceOutermost = styled.div`
    width: 50%;
    padding: 1em;

    background-color: lightgray;
    border: 1px solid black;
    padding: 0.5em;
    border-radius: 0.5em;
    text-align: left;
    color: black;

    display: flex;
    flex-direction: row;

    :hover {
        border: 1px solid white;
    }
`;
