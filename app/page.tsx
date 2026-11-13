import Confetti from "./components/confetti";

// The community total does not need a fresh upstream request for every visit.
export const revalidate = 300;

async function getPublishedContentCount() {
  try {
    const response = await fetch(
      "https://www.tabnews.com.br/api/v1/contents?strategy=new&page=1&per_page=1",
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(3000) },
    );

    if (!response.ok) return null;

    const count = response.headers.get("x-pagination-total-rows");
    return count && /^\d+$/.test(count) ? Number(count) : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const contentCount = await getPublishedContentCount();

  return (
    <main className="landing">
      <Confetti />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="wordmark" href="https://www.tabnews.com.br/" aria-label="TabNews">
          <span className="wordmark-mark">t</span>
          <span>tabnews</span>
        </a>
        <span className="status"><span /> Rebuild in progress</span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="eyebrow"><span className="eyebrow-line" /> A new chapter is taking shape</div>
        <h1 id="hero-title">
          We’re rebuilding
          <br />
          <span>TabNews.</span>
        </h1>
        <p className="intro">
          The place on the internet for people who work with technology—and want
          to discover content that’s truly worth their time.
        </p>

        <div className="progress-card">
          <div className="progress-topline">
            <span className="progress-label"><span className="live-dot" /> Building something good</span>
            <span className="progress-code">01 / IN PROGRESS</span>
          </div>
          <div className="progress-track" aria-label="Rebuild in progress">
            <span />
          </div>
          <div className="progress-bottomline">
            <span>Thoughtful conversations. Useful knowledge.</span>
            <span>Worth the wait.</span>
          </div>
        </div>

        <a className="explore-link" href="https://www.tabnews.com.br/">
          Visit the original TabNews <span aria-hidden="true">↗</span>
        </a>
      </section>

      <aside className="community-card" aria-label="TabNews community size">
        <span className="community-icon" aria-hidden="true">✳</span>
        <div>
          <span className="community-label">A community of ideas</span>
          <p className="community-count">
            {contentCount === null ? "—" : contentCount.toLocaleString("en-US")}
          </p>
          <span className="community-caption">published contents on TabNews</span>
        </div>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </aside>

      <footer className="footer">
        <span>© <a href="https://www.tabnews.com.br/">TabNews</a> · Independent rebuild project</span>
        <a href="https://github.com/ItaloPussi/ai-tabnews" className="repo-link">
          View the repository <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </main>
  );
}
