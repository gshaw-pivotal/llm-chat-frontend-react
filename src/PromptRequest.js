export class PromptRequest {

    model = "";
    messages = [];
    temperature = 0.7;
    max_tokens = -1;
    stream = "false";

    constructor() {
    }

    setModel(model) {
        this.model = model;
    }

    setMessages(messages) {
        this.messages = messages;
    }
}