import React from 'react'

const questionId = ['ep1', 'ep2', 'ep3', 'ep4'] as const
type QuestionId = typeof questionId[number]
interface Question {
  text: string
  right: string
  options: string[]
}
const questions: { [K in QuestionId]: Question } = {
  ep1: {
    text:
      'ファントム・メナス：タトゥイーンのポッドレースでアナキンのライバルであったレーサーの名前は？',
    right: 'セブルバ',
    options: ['', 'ワトー', 'ダース・モール', 'セブルバ', 'ヌート・ガンレイ']
  },
  ep2: {
    text: 'クローン戦争：クローン戦争が勃発した惑星の名前は？',
    right: 'ジオノーシス',
    options: ['', 'ジオノーシス', 'ヤヴィン', 'エンドア', 'スカリフ']
  },
  ep3: {
    text: 'シスの復讐：アナキンが共和国を裏切って最初に倒したジェダイは？',
    right: 'メイス・ウィンドゥ',
    options: [
      '',
      'キ＝アディ＝ムンディ',
      'アイラ・セキュラ',
      'クワイ＝ガン・ジン',
      'メイス・ウィンドゥ'
    ]
  },
  ep4: {
    text: 'ジェダイの帰還：ヤヴィンの戦いの生還者は次のうち誰？',
    right: 'ウェッジ・アンティリーズ',
    options: ['', 'ビッグス・ダークライター', 'ウェッジ・アンティリーズ', 'ジェック・ポーキンス']
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
  const renderOptions = (options: string[]) => {
    return options.map((v) => <option value={v}>{v}</option>)
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
    <div>
      <h2>
        【Q{props.index + 1}】{props.id}: {props.question.text}
      </h2>
      <div>
        <form>
          <label>
            回答：
            <select value={props.answer} onChange={handleChange}>
              {renderOptions(props.question.options)}
            </select>
            {renderResult()}
          </label>
        </form>
      </div>
    </div>
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
      <h1>スターウォーズのクイズ</h1>
      <p>
        {Object.keys(questions).length}問中 {Object.entries(resultState).filter(Boolean).length}
        問正解
      </p>
      {questionItems}
    </div>
  )
}
