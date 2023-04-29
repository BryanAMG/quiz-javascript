import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Question as QuestionType } from '../type'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { xt256 } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from '../store/questions'
import { getBackgroundColor } from '../utils/questions'

interface Props {
  info: QuestionType
}

// xt256
export const Question = ({ info }: Props) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)
  const { id, question, code, answers, userSelectedAnswer } = info

  const handleSelectUser = (answerIndex: number) => () => {
    selectAnswer(id, answerIndex)
  }
  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', textAlign: 'start', p: 2, mt: 4 }}>
      <Typography variant='h5'>{question}</Typography>
      <SyntaxHighlighter language='javascript' style={xt256}>
        {code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333', textAlign: 'center' }} disablePadding>
        {
          answers.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                onClick={handleSelectUser(index)}
                disabled={userSelectedAnswer != null}
                sx={{
                  bgcolor: getBackgroundColor(info, index)
                }}
              >
                <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Card>
  )
}
