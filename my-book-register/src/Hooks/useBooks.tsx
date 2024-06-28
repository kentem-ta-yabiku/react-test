import React, { useState } from 'react'
import { BookItemModel } from '../models';

export const useBooks = () => {
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

  const isUniqueBooks = (name: string) => {
    const fillterdBooks = books.filter((book) => {
      return book.name !== name;
    })
    if (fillterdBooks.length !== books.length){
      return false
    }else{
      return true
    }
  }

  const onPostCompleted = (postedItem: Omit<BookItemModel, 'id'>): void => {
    if(isUniqueBooks(postedItem.name)){
      setBooks((prev) => [
        ...prev,
        {
          id: prev.length.toString(),
          ...postedItem,
        },
      ]);
    }
  }

  // 更新関数setIsbnを子に直接渡さないためのハンドラ
  const handleSetIsbn = (value: string) => {
    // gをつけることで文字列全体に適応できるらしい. replaceAll?みたいなのがありませんでした。
    const withoutHyphenValue = value.replace(/-/g, '')
    console.log(withoutHyphenValue)
    setIsbn(withoutHyphenValue);
  }

  const switchIsLeading = (id: string) => {
    const filterdBooks = books.map((book) => {
      if(book.id !== id) return book
      else { 
        const newBook = {...book}
        newBook.isOnLoan = !newBook.isOnLoan
        return newBook
      }
    })
    setBooks([...filterdBooks])
  }

  const deleteBooks = (id: string) => {
    const filterdBooks = books.filter((book) => {
      return book.id !== id;
    })
    setBooks([...filterdBooks])
  }

  return {
    books,
    isbn,
    handleClickButton,
    handleSetIsbn,
    switchIsLeading,
    deleteBooks,
  }
}
