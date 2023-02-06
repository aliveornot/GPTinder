import { atom } from 'jotai';
import { DEFAULT_INTEROCUTOR_NAME, DEFAULT_MY_NAME, DEFAULT_USER_PROMPT } from '../defaultValues/defaultValues';

interface StoredInfoType {
    myName: string;
    interlocutorName: string;
    userPrompt: string;
}

const storedInfoAtom = atom<StoredInfoType>({ myName: DEFAULT_MY_NAME, interlocutorName: DEFAULT_INTEROCUTOR_NAME, userPrompt: DEFAULT_USER_PROMPT });
export default storedInfoAtom;
