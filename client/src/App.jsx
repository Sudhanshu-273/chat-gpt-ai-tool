import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useRef } from 'react'
import axios from "axios";


const YOU = "you";
const AI = "ai";



function App() {

  const inputRef = useRef();
  const [qna, setQna] = useState([]);
  const [loading, setLoading] = useState(false);


  const updateQNA = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  }

  const somefunc = () => {
    try {
      document.getElementsByClassName('container').style.height = "90vh";
    } catch (error) {
      console.log(error)
    }
    
    handleSend();
  }

  const handleSend = () => {



    if (inputRef.current.value === "/clear") {
      return location.reload();
    }
    if (inputRef.current.value === "/owner") {
      const val = document.getElementById('input-val');
      val.value = "";
      return updateQNA(AI, "Hi, I am Sudhanshu. I am a Software Engineer. I am the developer of this App. Nice to see you :)");
    }
    if (inputRef.current.value === "") {
      return window.reload();
    }

    const question = inputRef.current.value;
    updateQNA(YOU, question);
    setLoading(true);


    axios.post('http://localhost:3000/chat', {
      question,
    }).then(response => {
      updateQNA(AI, response.data.answer)
    }).finally(() => {
      setLoading(false);
    })



    console.log({ question });
    const val = document.getElementById('input-val');
    val.value = "";
  }

  const renderContent = (qna) => {
    const value = qna.value;
    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">{v}</p>);
    }
    return <p className="message-text">{value}</p>
  }

  return (
    <div >
      <main className="container">
        <div className="chats">
          {
            qna.map(qna => {
              if (qna.from === YOU) {
                return (
                  <div className="send chat">
                    <img
                      src="./resources/man.png"
                      alt=""
                      className="avtar"
                    />
                    <p onChange={scroll}>
                      {
                        renderContent(qna)
                      }
                    </p>
                  </div>
                )
              }
              return (
                <div className="recieve chat">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1782/1782391.png"
                    alt=""
                    className="avtar"
                  />
                  <p onChange={scroll}>
                    {
                      renderContent(qna)
                    }
                  </p>
                </div>
              )
            })

          }
          {
            loading && (
              <div className="recieve chat">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                  alt=""
                  className="avtar"
                />
                <p>Typing...</p>
              </div>
            )
          }
        </div>


        <div className="chat-input">
          <input
            id='input-val'
            type="text"
            ref={inputRef}
            className="form-control col"
            placeholder="Type Something"
          />
          <button disabled={loading} className="btn btn-success" onClick={handleSend}>Send</button>
        </div>
        <div className="foot">
          <b>/owner</b> to get <a href="https://www.linkedin.com/in/sudhanshu273/" target="_blank">developer</a> details. <br />
          <b>/clear</b> to clear the chat history.
        </div>
      </main>
    </div>

  )
}

export default App
