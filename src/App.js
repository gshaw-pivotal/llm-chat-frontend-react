import React, {useEffect, useState} from 'react';

import {getModels, submitPrompt} from "./Api";

const Chat = () => {

    const [disableButton, setDisableButton] = useState(false);

    const [modelList, setModelList] = useState([]);
    const [selectedModel1, setSelectedModel1] = useState("");
    const [selectedModel2, setSelectedModel2] = useState("");
    const [selectedModel3, setSelectedModel3] = useState("");

    const [response1, setResponse1] = useState("");
    const [response2, setResponse2] = useState("");
    const [response3, setResponse3] = useState("");
    const [systemCommand, setSystemCommand] = useState("");
    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        models();
    }, []);

    const models = () => {
        getModels().then(response => {
            setModelList(response);
            setSelectedModel1("");
            setSelectedModel2("");
            setSelectedModel3("");
        });
    };

    const submit = () => {
        setDisableButton(true);

        if (selectedModel1 !== "") {

            setResponse1("");

            submitPrompt(selectedModel1, systemCommand, prompt).then(response => {
                setResponse1(response.responseAnswer);
                if (response.responseSuccess === true) {
                }
            });
        }

        if (selectedModel2 !== "") {

            setResponse2("");

            submitPrompt(selectedModel2, systemCommand, prompt).then(response => {
                setResponse2(response.responseAnswer);
                if (response.responseSuccess === true) {
                }
            });
        }

        if (selectedModel3 !== "") {

            setResponse3("");

            submitPrompt(selectedModel3, systemCommand, prompt).then(response => {
                setResponse3(response.responseAnswer);
                if (response.responseSuccess === true) {
                }
            });
        }



        setDisableButton(false);
    };

    return (
      <div>
          <div className="model-div">
              <div className="model-sub-div">
                  <span className="model-label">Select Model</span>
                  <select name="llm-1" className="model-select">
                      <option onClick={(e) => setSelectedModel1("")}></option>
                      {modelList.map(model => (
                          <option onClick={(e) => setSelectedModel1(e.target.value)}>{model}</option>
                      ))}
                  </select>
                  <span className="model-label">Select Model</span>
                  <select name="llm-2" className="model-select">
                      <option onClick={(e) => setSelectedModel2("")}></option>
                      {modelList.map(model => (
                          <option onClick={(e) => setSelectedModel2(e.target.value)}>{model}</option>
                      ))}
                  </select>
                  <span className="model-label">Select Model</span>
                  <select name="llm-3" className="model-select">
                      <option onClick={(e) => setSelectedModel3("")}></option>
                      {modelList.map(model => (
                          <option onClick={(e) => setSelectedModel3(e.target.value)}>{model}</option>
                      ))}
                  </select>
              </div>
          </div>
          <div className="response-div">
              <div className="response-sub-div">
                  <span className="response-label">Response</span>
                  <textarea className="response-textarea" value={response1}/>
                  <span className="response-label">Response</span>
                  <textarea className="response-textarea" value={response2}/>
                  <span className="response-label">Response</span>
                  <textarea className="response-textarea" value={response3}/>
              </div>
          </div>
          <hr/>
          <div className="system-div">
              <div className="system-sub-spacer-div">
                  <span className="system-label">System Commands</span>
              </div>
              <div className="system-sub-div">
                  <textarea
                      className="system-textarea"
                      onChange={(e) => setSystemCommand(e.target.value)}
                      value={systemCommand}/>
              </div>
              <div className="system-sub-spacer-div"></div>
          </div>
          <hr/>
          <div className="prompt-div">
              <div className="prompt-sub-spacer-div">
                  <span className="prompt-label">Prompt Input</span>
              </div>
              <div className="prompt-sub-div">
                  <textarea
                      className="prompt-textarea"
                      onChange={(e) => setPrompt(e.target.value)}
                      value={prompt}/>
              </div>
              <div className="prompt-sub-spacer-div"></div>
          </div>
          <div className="prompt-button-div">
              <button className="prompt-button" disabled={disableButton} onClick={submit}>Submit</button>
          </div>
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
