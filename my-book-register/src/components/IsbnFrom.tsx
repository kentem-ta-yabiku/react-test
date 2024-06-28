import React from 'react'

interface Props {
  isbn: string;
  handleSetState: (value: string) => void;
}

const IsbnFrom = ({isbn, handleSetState}: Props) => {
  return (
    <div className="label-input">
          <label className="label">
            ISBNコード
          </label>
          <input className="input" placeholder="入力してください" value={isbn} onChange={(e) => handleSetState(e.target.value)}></input>
        </div>
  )
}

export default IsbnFrom