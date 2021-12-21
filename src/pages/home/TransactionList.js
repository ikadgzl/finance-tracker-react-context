import { useFireStore } from '../../hooks/useFireStore';
import styles from './Home.module.css';

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFireStore('transactions');

  return (
    <ul className={styles.transactions}>
      {transactions.map(({ id, name, amount }) => (
        <li key={id}>
          <p className={styles.name}>{name}</p>
          <p className={styles.amount}>${amount}</p>
          <button onClick={() => deleteDocument(id)}>x</button>
        </li>
      ))}
    </ul>
  );
}
