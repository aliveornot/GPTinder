import GPT3Tokenizer from 'gpt3-tokenizer';
const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });

export interface MessageType {
    timeString: string;
    text: string;
    speaker: string;
}

export async function getBioAndMessagesFromScreen({ myName, interlocutorName }: { myName: string; interlocutorName: string }) {
    // get messages
    const messageContainers = Array.from(document.querySelectorAll('.msgHelper')) as HTMLElement[];
    const messages: MessageType[] = messageContainers
        .map((messageContainer) => {
            const timeString = messageContainer.getElementsByTagName('time')[0].getAttribute('datetime') as string;
            const textElem = messageContainer.querySelector('* .text');
            let text = '';
            if (textElem) {
                text = (messageContainer.querySelector('* .text') as HTMLElement).innerText;
            }

            const speaker = getComputedStyle(messageContainer).textAlign === 'end' ? myName : interlocutorName;
            return { speaker, text, timeString };
        })
        .sort((a, b) => {
            const aTime = new Date(a.timeString);
            const bTime = new Date(b.timeString);
            return aTime.getTime() - bTime.getTime();
        });

    const profileElement = document.querySelector('.profileCard__card .BreakWord div');

    // get bio if possible
    let bio = '';
    if (profileElement instanceof HTMLElement) {
        bio = profileElement.innerText;
    }

    return { bio, messages };
}

export function messagesToConversationalText({
    messages,
    maxTokenLength,
    myName,
    interlocutorName,
}: {
    messages: MessageType[];
    maxTokenLength: number;
    myName: string;
    interlocutorName: string;
}) {
    if (messages.length === 0) {
        return `${myName} is trying to start chatting with ${interlocutorName} on a dating app.`;
    }

    const converstionChunks = messages.map((message) => `${message.speaker}: ${message.text}\n`);
    const reversedConverstionChunks = converstionChunks.reverse();

    let trimmedConversationText = '';
    let tokenLength = 0;
    for (const chunk of reversedConverstionChunks) {
        const chunkTokenLength = tokenizer.encode(chunk).text.length;
        if (tokenLength + chunkTokenLength < maxTokenLength) {
            tokenLength += chunkTokenLength;
            trimmedConversationText = chunk.concat(trimmedConversationText); // prepend
        } else {
            break; // we've reached the max token length
        }
    }

    return trimmedConversationText;
}
