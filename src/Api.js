import {Message} from "./Message";
import {PromptRequest} from "./PromptRequest";
import {PromptResponse} from "./PromptResponse";

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:1234' : '';

export async function submitPrompt(model, command, prompt) {
    //Prep request
    let messages = [];
    if (command.trim().length > 0) {
        messages.push(new Message("system", command));
    }

    if (prompt.trim().length > 0) {
        messages.push(new Message("user", prompt));
    }

    let request = new PromptRequest();
    request.setModel(model);
    request.setMessages(messages);

    //Make request
    const response = await fetch(`${API_URL}/v1/chat/completions`, {
        method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                // 'no-cors': true,
        },
        body: JSON.stringify(request)
    });

    //Process response
    if (response.ok) {
        let json = await response.json();

        if (json.choices !== null && json.choices.length > 0) {
            let success = new PromptResponse(true);
            success.setAnswer(json.choices[0].message.content);
            success.setAnswerStats(json.usage.prompt_tokens, json.usage.completion_tokens, json.usage.total_tokens);
            return success;
        }

        let failure = new PromptResponse(false);
        failure.setAnswer('No message found in response')
        return failure;
    }

    let failure = new PromptResponse(false);
    failure.setAnswer('An error occurred while making prompt request');
    return failure;
}
