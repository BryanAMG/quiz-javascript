import { Button, Stack } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import { useQuestionsData } from '../hook/useQuestionsResults'

export const Footer = () => {
  const reset = useQuestionsStore(state => state.reset)
  const { correct, incorrect, unanswered } = useQuestionsData()
  return (
    <footer style={{ marginTop: '15px' }}>
      <Stack direction='row' justifyContent='center' gap={2}>
        <strong style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <CheckIcon color='success' /> {correct} correctas
        </strong>
        <strong style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <ClearIcon color='error' />  {incorrect}  incorrectas
        </strong>
        <strong style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <QuestionMarkIcon color='primary' />  {unanswered}  sin responder
        </strong>
      </Stack>
      <Button variant='outlined' onClick={reset} sx={{ mt: 2 }}> Reset </Button>
    </footer>
  )
}
