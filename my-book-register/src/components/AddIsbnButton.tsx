import React from 'react'

interface Props {
  handleOnClick: () => void;
}

const AddIsbnButton = ({handleOnClick}:Props) => {
  return (
    <button className="button" onClick={handleOnClick}>
          書籍登録
    </button>
  )
}

export default AddIsbnButton