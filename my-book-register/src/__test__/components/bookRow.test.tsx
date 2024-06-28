import { render, screen, fireEvent, getByRole, getByTestId, cleanup } from '@testing-library/react';
import {beforeEach, afterEach, describe, it, expect, test} from 'vitest'
import"@testing-library/jest-dom/vitest"
import { useBooks } from '../../Hooks/useBooks';
import BookRow from '../../components/bookRow';

const Test = () => {
  const {books, handleSetIsbn, getBooksByIsbn , deleteBooks, switchIsLeading}  = useBooks()

  // 新しい本を追加
  handleSetIsbn("");
  getBooksByIsbn();

  return (
    <BookRow bookItem={books[0]} onClickDelete={deleteBooks} onClickLendingSwitch={switchIsLeading} />
  )
}

describe("削除, 貸出, 返却ボタンのテスト", () => {
  it("貸出ボタンで「貸出中」になる", () => {
    render(<Test/>);
    const lornBtn = screen.getByText("貸出");
    expect(lornBtn).toBeInTheDocument()
  })
})