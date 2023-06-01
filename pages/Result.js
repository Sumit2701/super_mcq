import { useRouter } from 'next/router';
import Navbar from '../components/Layouts';
import styles from'../styles/Result.module.css'
export default function Results() {
  const router = useRouter();
  const { score } = router.query;

  return ( <Navbar>
      <div className={styles.resultPage}>
      <div className={styles.resultContainer}>
        <h1 className={styles.resultTitle}>Results</h1>
        <p className={styles.resultScore}>Your score: {score}</p>
    
      </div>
    </div></Navbar>
  );
}