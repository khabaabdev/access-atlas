import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="error-state" aria-labelledby="not-found-title">
      <p className="eyebrow">A different path</p>
      <h1 id="not-found-title">That page is not here.</h1>
      <p>Return to Access Atlas and make one clear start.</p>
      <Link className="primary-button" href="/">Go to Access Atlas</Link>
    </main>
  );
}
