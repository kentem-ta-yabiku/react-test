import { BookItemModel } from '../models';

interface Props {
  bookItem: BookItemModel;
  onClickDelete: (id: string) => void;
  onClickLendingSwitch: (id: string) => void;
}

const BookRow = ({ bookItem, onClickDelete, onClickLendingSwitch }: Props) => {
  return (
    <tr>
      <td>{bookItem.name}</td>
      <td>{'貸出中 or 利用可能'}</td>
      <td>
        <button className="button" onClick={() => onClickDelete(bookItem.id)}>
          削除
        </button>
        <button className="button" onClick={() => onClickLendingSwitch(bookItem.id)} disabled={bookItem.isOnLoan}>
          貸出
        </button>
        <button className="button" onClick={() => onClickLendingSwitch(bookItem.id)} disabled={!bookItem.isOnLoan}>
          返却
        </button>
      </td>
    </tr>
  );
};
export default BookRow;
