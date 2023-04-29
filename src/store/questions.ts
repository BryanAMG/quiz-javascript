import { create } from 'zustand'
import { type Question } from '../type'
import { persist } from 'zustand/middleware'
import confetti from 'canvas-confetti'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, selectedAnswerId: number) => void
  goToNextQuestion: () => void
  goToPreviusQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => ({
  questions: [],
  currentQuestion: 0,

  fetchQuestions: async (limit: number) => {
    const res = await fetch('http://localhost:5173/data.json')
    const data = await res.json()
    const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions })
  },

  selectAnswer: (questionId, selectedAnswerId) => {
    const { questions } = get()
    const cloneQuestions = structuredClone(questions) as Question[]
    const questionIndex = questions.findIndex((question) => question.id === questionId)
    const questionInfo = cloneQuestions[questionIndex]
    const isCorrectUserAnswer = questionInfo.correctAnswer === selectedAnswerId
    if (isCorrectUserAnswer) confetti()
    cloneQuestions[questionIndex] = {
      ...questionInfo,
      userSelectedAnswer: selectedAnswerId,
      isCorrectUserAnswer
    }
    set({ questions: cloneQuestions })
  },
  goToNextQuestion: () => {
    const { currentQuestion, questions } = get()
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion })
    }
  },
  goToPreviusQuestion: () => {
    const { currentQuestion } = get()
    const nextQuestion = currentQuestion - 1
    if (nextQuestion >= 0) {
      set({ currentQuestion: nextQuestion })
    }
  },
  reset: () => {
    set({ currentQuestion: 0, questions: [] })
  }
}), {
  name: 'questions'
}))
