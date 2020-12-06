import {
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'
import React from 'react'

const questionId = ['ep1', 'ep2', 'ep3', 'ep4'] as const
type QuestionId = typeof questionId[number]
interface Question {
  text: string
  right: string
  options: string[]
}

const TITLE: { [K in QuestionId]: string } = {
  ep1: 'ファントム・メナス',
  ep2: 'クローン戦争',
  ep3: 'シスの復讐',
  ep4: '新たなる希望'
}

const questions: { [K in QuestionId]: Question } = {
  ep1: {
    text: 'タトゥイーンのポッドレースでアナキンのライバルであったレーサーの名前は？',
    right: 'セブルバ',
    options: ['ワトー', 'ダース・モール', 'セブルバ', 'ヌート・ガンレイ']
  },
  ep2: {
    text: 'クローン戦争が勃発した惑星の名前は？',
    right: 'ジオノーシス',
    options: ['ジオノーシス', 'ヤヴィン', 'エンドア', 'スカリフ']
  },
  ep3: {
    text: 'アナキンが共和国を裏切って最初に倒したジェダイは？',
    right: 'メイス・ウィンドゥ',
    options: [
      'キ＝アディ＝ムンディ',
      'アイラ・セキュラ',
      'クワイ＝ガン・ジン',
      'メイス・ウィンドゥ'
    ]
  },
  ep4: {
    text: 'ヤヴィンの戦いの生還者は次のうち誰？',
    right: 'ウェッジ・アンティリーズ',
    options: ['ビッグス・ダークライター', 'ウェッジ・アンティリーズ', 'ジェック・ポーキンス']
  }
}

interface QuestionProp {
  id: QuestionId
  index: number
  question: Question
  answer?: string
  result?: boolean
  onAnswer: (id: QuestionId, value: string) => void
}

const Question = (props: QuestionProp) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  }))
  const classes = useStyles()

  const renderOptions = (options: string[]) => {
    return options.map((v) => <MenuItem value={v}>{v}</MenuItem>)
  }
  const renderResult = () => {
    if (props.result !== undefined) {
      return <span>{props.result ? '正解' : '不正解'}</span>
    }
  }

  const handleChange = (event: any) => {
    props.onAnswer(props.id, event.target.value)
  }

  return (
    <Grid key={props.index} item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            【Q{props.index + 1}】{props.id} {TITLE[props.id]}
          </Typography>
          <Typography>{props.question.text}</Typography>
        </CardContent>
        <CardActions>
          <FormControl className={classes.formControl}>
            <Select value={props.answer} onChange={handleChange} displayEmpty>
              {renderOptions(props.question.options)}
            </Select>
          </FormControl>
          <Typography>{renderResult()}</Typography>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default function Quiz() {
  const [answerState, setAnswerState] = React.useState<{ [K in QuestionId]?: string }>({})
  const [resultState, setResultState] = React.useState<{ [K in QuestionId]?: boolean }>({})

  const handleAnswer = (id: QuestionId, value: string) => {
    setAnswerState({ ...answerState, [id]: value })

    const result = questions[id].right === value
    setResultState({ ...resultState, [id]: result })
  }

  const questionItems = questionId.map((v, i) => (
    <Question
      id={v}
      index={i}
      question={questions[v]}
      answer={answerState[v]}
      result={resultState[v]}
      onAnswer={handleAnswer}
    />
  ))

  return (
    <div className="Quiz">
      <Container>
        <h1>スターウォーズのクイズ</h1>
        <p>
          {Object.keys(questions).length}問中 {Object.entries(resultState).filter(Boolean).length}
          問正解
        </p>
        <Grid container spacing={4}>
          {questionItems}
        </Grid>
      </Container>
    </div>
  )
}
