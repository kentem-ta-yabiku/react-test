import { useState } from 'react';
import './App.css';
import FilterableBookTable from './components/filterableBookTable';
import { BookItemModel } from './models';
import IsbnFrom from './components/IsbnFrom';
import AddIsbnButton from './components/AddIsbnButton';

function App() {
  const [isbn, setIsbn] = useState('');
  const [books, setBooks] = useState<BookItemModel[]>([]);

  const handleClickButton = (): void => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.totalItems === 0) {
          alert('登録されていない ISBN コードです。');
          return;
        }
        onPostCompleted({
          name: data.items[0].volumeInfo.title,
          isOnLoan: false,
        });
      });
  };

  const onPostCompleted = (postedItem: Omit<BookItemModel, 'id'>): void => {
    setBooks((prev) => [
      ...prev,
      {
        id: prev.length.toString(),
        ...postedItem,
      },
    ]);
  }

  // 更新関数setIsbnを子に直接渡さないためのハンドラ
  const handleSetIsbn = (value: string) => {
    setIsbn(value);
  }

  return (
    <div className="App">
      {/* 第1問：コンポーネントに分割 ↓ ↓ ↓ ↓ ↓ */}
      <div className="book-register">
        <IsbnFrom isbn={isbn} handleSetState={handleSetIsbn} />
        <AddIsbnButton handleOnClick={handleClickButton}/>
      </div>
      {/* 第1問：コンポーネントに分割 ↑ ↑ ↑ ↑ ↑ ↑ */}
      <hr />
      <FilterableBookTable
        books={books}
        onClickDelete={(id) => {
            {/* 第2問：貸出 or 返却 or 削除の処理を追加 */}            
          }
        }
        onClickLendingSwitch={(id) => {
            {/* 第2問：貸出 or 返却 or 削除の処理を追加 */}            
          }
        }
      />
    </div>
  );
}

export default App;
