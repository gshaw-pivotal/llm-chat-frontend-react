import React, {useEffect, useState} from 'react';

import {getModels, submitPrompt} from "./Api";

const Chat = () => {

    const [disableButton, setDisableButton] = useState(false);

    const [modelList, setModelList] = useState(['abc', 'def', '123', '456']);
    const [selectedModel, setSelectedModel] = useState("");

    const [response, setResponse] = useState("");
    const [systemCommand, setSystemCommand] = useState("");
    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        models();
    }, []);

    const models = () => {
        getModels().then(response => {
            setModelList(response);
            setSelectedModel(response[0]);
        });
    };

    const submit = () => {
        setDisableButton(true);

        setResponse("");

        submitPrompt(selectedModel, systemCommand, prompt).then(response => {
            setResponse(response.responseAnswer);
            if (response.responseSuccess === true) {
                setPrompt("");
            }
        });

        setDisableButton(false);
    };

    return (
      <div>
          <div className="model-div">
              <div className="model-sub-div">
                  <span className="model-label">Select Model</span>
                  <select className="model-select">
                      {modelList.map(model => (
                          <option onClick={(e) => setSelectedModel(e.target.value)}>{model}</option>
                      ))}
                  </select>
              </div>
          </div>
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
                  <textarea
                      className="system-textarea"
                      onChange={(e) => setSystemCommand(e.target.value)}
                      value={systemCommand}/>
              </div>
          </div>
          <hr/>
          <div className="prompt-div">
              <div className="prompt-sub-div">
                  <span className="prompt-label">Prompt Input</span>
                  <textarea
                      className="prompt-textarea"
                      onChange={(e) => setPrompt(e.target.value)}
                      value={prompt}/>
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
