import { useEffect, useState } from 'react';
import { useFireStore } from '../../hooks/useFireStore';

const INITIAL_TRANSACTION_INFO = {
  name: '',
  amount: ''
};
export default function TransactionForm({ uid }) {
  const [transactionInfo, setTransactionInfo] = useState(
    INITIAL_TRANSACTION_INFO
  );

  const { addDocument, response } = useFireStore('transactions');

  const inputChangeHandler = (e) => {
    setTransactionInfo((prevTransactionInfo) => ({
      ...prevTransactionInfo,
      [e.target.name]: [e.target.value]
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    addDocument({ uid, ...transactionInfo });
  };

  useEffect(() => {
    if (response.success) {
      setTransactionInfo(INITIAL_TRANSACTION_INFO);
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>

      <form onSubmit={formSubmitHandler}>
        <label>
          <span>Transaction Name:</span>
          <input
            type='text'
            name='name'
            onChange={inputChangeHandler}
            value={transactionInfo.name}
            required
          />
        </label>

        <label>
          <span>Amount ($):</span>
          <input
            type='number'
            name='amount'
            onChange={inputChangeHandler}
            value={transactionInfo.amount}
          />
        </label>

        <button type='submit'>Add Transaction</button>
      </form>
    </>
  );
}
