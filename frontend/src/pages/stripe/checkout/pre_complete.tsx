import * as React from 'react'

export default function PreCompleteCheckout() {
  return (
    <>
      <div className="text-4xl w-full h-screen flex flex-col items-center justify-center">
        <p className="text-4xl">注文が完了しました</p>
        <button className="btn btn-primary w-1/2 mt-12">ArtSquareに戻る</button>
      </div>
    </>
  )
}
