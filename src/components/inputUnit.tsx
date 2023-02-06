import React, { useState } from 'react';
import styled from 'styled-components';

export default function InputUnit({
    label,
    placeholder,
    value,
    children,
    onChange,
}: React.PropsWithChildren<{
    label: string;
    placeholder: string;
    value: string;

    onChange: (newValue: string) => void;
}>) {
    return (
        <_InputUnitOutermost>
            <_Label>{label}</_Label>
            {children}
            <_Input
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
            />
        </_InputUnitOutermost>
    );
}

const _InputUnitOutermost = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    padding: 0.5em;
    gap: 0.5em;
`;

const _Label = styled.label``;

const _Input = styled.input`
    align-self: stretch;
`;
