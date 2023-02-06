export default async function openAiRequest(prompt: string, openAIKey: string) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(openAIKey),
        },
        body: JSON.stringify({
            prompt: prompt,
            temperature: 0.4,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ']',
            best_of: 1,
        }),
    };
    const reponse = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions);
    const reponseJson = await reponse.json();
    return reponseJson;
}
