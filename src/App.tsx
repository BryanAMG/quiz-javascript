
import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavaScriptLogo } from './components/Icons'
import { StartGame } from './components/StartGame'
import { useQuestionsStore } from './store/questions'
import { Game } from './components/Game'

function App () {
  const questions = useQuestionsStore(state => state.questions)

  return (
    <main>
      <Container>
        <Stack direction='row' justifyContent='center' alignItems='center' gap={2}>
          <Typography variant='h2' component='h1'> JavaScript Quiz </Typography>
          <JavaScriptLogo />
        </Stack>
        {questions.length === 0 && <StartGame />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
