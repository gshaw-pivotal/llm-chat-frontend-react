export class PromptResponse {

    responseSuccess = null;
    responseAnswer = "";

    promptTokens = null;
    completionTokens = null;
    totalTokens = null;

    constructor(success) {
        this.responseSuccess = success;
    }

    setAnswer(answer) {
        this.responseAnswer = answer;
    }

    setAnswerStats(pTokens, cTokens, tTokens) {
        this.promptTokens = pTokens;
        this.completionTokens = cTokens;
        this.totalTokens = tTokens;
    }
}