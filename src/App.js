import React from 'react';

const Chat = () => {
    return (
      <div>
          <div className="response-div">
              <div className="response-sub-div">
                  <span className="response-label">Response</span>
                  <textarea className="response-textarea"/>
              </div>
          </div>
          <hr/>
          <div className="system-div">
              <div className="system-sub-div">
                  <span className="system-label">System Commands</span>
                  <textarea className="system-textarea"/>
              </div>
          </div>
          <hr/>
          <div className="prompt-div">
              <div className="prompt-sub-div">
                  <span className="prompt-label">Prompt Input</span>
                  <textarea className="prompt-textarea"/>
              </div>
              <div className="prompt-button">
                  <button>Submit</button>
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
