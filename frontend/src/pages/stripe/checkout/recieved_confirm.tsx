import * as React from 'react'
import { useState } from 'react'

export default function Recieved() {
  const [sessionId, setSessionId] = useState('') // session_idの状態管理

  const handleChange = (event) => {
    setSessionId(event.target.value) // session_idを更新
  }

  const handleClick = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACK + '/stripe/checkout/capture_complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId, // 入力したsession_idを送信
      }),
    })

    if (response.ok) {
      console.log('受け取り確認が完了しました')
    } else {
      console.log('再度ボタンを押してください')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={sessionId}
        onChange={handleChange}
        placeholder="session_idを入力"
        className="input-class" // 必要に応じてスタイルを適用
      />
      <button className="btn btn-primary w-full my-32" onClick={handleClick}>
        受け取り確認しました
      </button>
    </div>
  )
}
