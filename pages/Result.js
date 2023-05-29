import { useRouter } from 'next/router';

export default function Results() {
  const router = useRouter();
  const { score } = router.query;

  return (
    <div>
      <h1>Results</h1>
      <p>Your score: {score}</p>
      {/* Add your result page content and styling here */}
    </div>
  );
}