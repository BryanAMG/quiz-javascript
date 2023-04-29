import { IconButton, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { Question } from './Question'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Footer } from './Footer'

export const Game = () => {
  const [questions, currentQuestion, goToNextQuestion, goToPreviusQuestion] =
  useQuestionsStore(state => [state.questions, state.currentQuestion, state.goToNextQuestion, state.goToPreviusQuestion])

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' justifyContent='center' alignItems='center'>
        <IconButton onClick={goToPreviusQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography>
          {currentQuestion + 1} / {questions.length}
        </Typography>
        <IconButton onClick={goToNextQuestion} disabled={currentQuestion === questions.length - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
