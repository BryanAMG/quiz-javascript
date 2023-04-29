import { Question } from '../type'

export const getBackgroundColor = (questionInfo: Question, answerIndex: number) => {
  const { correctAnswer, userSelectedAnswer } = questionInfo
  if (userSelectedAnswer == null) return 'transparent'
  if (userSelectedAnswer !== answerIndex && correctAnswer !== answerIndex) return 'transparent'
  if (correctAnswer === answerIndex) return 'green'
  return 'red'
}

export const getResults = (questions: Question[]) => {
  const data = {
    correct: 0,
    incorrect: 0,
    unanswered: 0
  }

  questions.forEach(question => {
    const { userSelectedAnswer, isCorrectUserAnswer } = question
    if (userSelectedAnswer == null) {
      data.unanswered += 1
      return
    }
    if (isCorrectUserAnswer === true) {
      data.correct += 1
      return
    }
    data.incorrect += 1
  })

  return data
}
