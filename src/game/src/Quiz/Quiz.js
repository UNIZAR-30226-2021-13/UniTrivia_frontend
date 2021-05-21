import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import GameOver from './GameOver';


const QuizWindow = styled.div`
  text-align: center;
  font-size: clamp(20px, 2.5vw, 24px);
  margin-top: 10vh;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 2em auto;
  @media screen and (min-width: 1180px) {
    width: 50%;
  }
`;

const Option = styled.button`
  display: block;
  border: 1px solid #616A94;
  border-radius: 15px;
  padding: 15px 30px;
  text-decoration: none;
  color: #616A94;
  background-color: #161A31;
  transition: 0.3s;
  font-size: 1em;
  outline: none;
  user-select: none;
  margin-top: 1em;
  cursor: pointer;

  @media screen and (min-width: 1180px) {
    &:hover {
      color: white;
      background-color: #616A94;
    }
  }
`;

const Question = styled.div`
  width: 70%;
  margin: 0 auto;
`;

function Quiz(props) {

    console.log(props.pregunta)
        let question = props.pregunta.pregunta.pregunta; //se sacaría de props  pregunta.pregunta
        let incorrect_answers = props.pregunta.pregunta.resps_inc; //se sacaría de props
        let correct_answer = props.pregunta.pregunta.resp_c; //se sacaría de props
    //let question = "preguntita brother"; //se sacaría de props

    const [quiz, setQuiz] = useState([]);
    const [number, setNumber] = useState(0);
    const [pts, setPts] = useState(0);

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
    function sleep(ms){
        return new Promise((resolve)=>{
            setTimeout(resolve,ms);
        });
    }
    async function pickAnswer (e){
        //setTimeout(function (e){
        //await sleep(1000)
            console.log(e)
            var userAnswer = e.target.innerText;
            console.log(e.target.innerText)
            console.log(quiz[number])
            console.log(userAnswer)
            if (quiz[number].answer === userAnswer){
                setPts(pts + 1);
                props.onResponse({result: 1, casillaInfo: props.pregunta});
            }else{
                props.onResponse({result: 0, casillaInfo: props.pregunta});
            }
            setNumber(number + 1);
            //console.log(key);
        //},1000)
    }

    useEffect(() => {
        let pregunta_global = {
            question: question,
            options: shuffle([...incorrect_answers, correct_answer]),
            answer: correct_answer
        }
        setQuiz([pregunta_global]);
    }, []);

    return (
        <div>
        <QuizWindow>
            { quiz[number] &&

            <>
                <Question dangerouslySetInnerHTML={{ __html: quiz[number].question }}></Question>
                <Options>
                    {quiz[number].options.map((item, index) => (
                        <Option key={index} dangerouslySetInnerHTML={{ __html: item }} onClick={pickAnswer}></Option>
                    ))}
                </Options>
            </>
            }
            {
                number === 1 && <GameOver pts={pts}/>
            }
        </QuizWindow>
        </div>
    )
}

export default Quiz;