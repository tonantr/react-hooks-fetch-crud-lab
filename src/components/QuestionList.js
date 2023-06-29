import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      const updatedQuestion = questions.filter((question) => question.id !== id)
      setQuestions(updatedQuestion)
    })
  }

  function handleUpdateAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(correctIndex)
    })
    .then(res => res.json())
    // .then(data => console.log(data))
    .then((data) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === data.id) {
          return data
        } else {
          return question
        }
      })
      setQuestions(updatedQuestions)
    })
  }

  const questionItem = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteQuestion={handleDeleteQuestion}
      onUpdateAnswer={handleUpdateAnswer}
    />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItem}</ul>
    </section>
  );
}

export default QuestionList;