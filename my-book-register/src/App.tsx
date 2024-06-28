import { useState } from 'react';
import './App.css';
import FilterableBookTable from './components/filterableBookTable';
import { BookItemModel } from './models';
import IsbnFrom from './components/IsbnFrom';
import AddIsbnButton from './components/AddIsbnButton';
import { useBooks } from './Hooks/useBooks';

function App() {
  const {books, isbn, handleSetIsbn, getBooksByIsbn, deleteBooks, switchIsLeading} = useBooks();

  return (
    <div className="App">
      {/* 第1問：コンポーネントに分割 ↓ ↓ ↓ ↓ ↓ */}
      <div className="book-register">
        <IsbnFrom isbn={isbn} handleSetState={handleSetIsbn} />
        <AddIsbnButton  handleOnClick={getBooksByIsbn}  />
      </div>
      {/* 第1問：コンポーネントに分割 ↑ ↑ ↑ ↑ ↑ ↑ */}
      <hr />
      <FilterableBookTable
        books={books}
        onClickDelete={(id) => deleteBooks(id)
        }
        onClickLendingSwitch={(id) => switchIsLeading(id)
        }
      />
    </div>
  );
}

export default App;
