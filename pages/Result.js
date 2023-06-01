import { useRouter } from 'next/router';
import Navbar from '../components/Layouts';
export default function Results() {
  const router = useRouter();
  const { score } = router.query;

  return ( <Navbar>
    <div>
      <h1>Results</h1>
      <p>Your score: {score}</p>
      {/* Add your result page content and styling here */}
    </div></Navbar>
  );
}