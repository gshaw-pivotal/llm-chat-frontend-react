import React, {useState} from 'react';

import {submitPrompt} from "./Api";

const Chat = () => {

    const [disableButton, setDisableButton] = useState(false);

    const [response, setResponse] = useState("");
    const [systemCommand, setSystemCommand] = useState("");
    const [prompt, setPrompt] = useState("");

    const submit = () => {
        setDisableButton(true);

        setResponse("");

        submitPrompt("", systemCommand, prompt).then(response => {
            setResponse(response.responseAnswer);
            if (response.responseSuccess === true) {
                setPrompt("");
            }
        });

        setDisableButton(false);
    };

    return (
      <div>
          <div className="response-div">
              <div className="response-sub-div">
                  <span className="response-label">Response</span>
                  <textarea className="response-textarea" value={response}/>
              </div>
          </div>
          <hr/>
          <div className="system-div">
              <div className="system-sub-div">
                  <span className="system-label">System Commands</span>
                  <textarea className="system-textarea" onChange={(e) => setSystemCommand(e.target.value)}/>
              </div>
          </div>
          <hr/>
          <div className="prompt-div">
              <div className="prompt-sub-div">
                  <span className="prompt-label">Prompt Input</span>
                  <textarea className="prompt-textarea" onChange={(e) => setPrompt(e.target.value)}/>
              </div>
              <div className="prompt-button">
                  <button disabled={disableButton} onClick={submit}>Submit</button>
              </div>
          </div>
          <hr/>
      </div>
    );
};

function App() {
    return (
        <div>
            <Chat/>
        </div>
    );
}

export default App;
