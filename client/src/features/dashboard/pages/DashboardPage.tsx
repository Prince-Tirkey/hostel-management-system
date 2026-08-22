export function DashboardPage() {
  return (
    <section className="card">
      <h1>Smart Hostel Dashboard</h1>
      <p>
        One place for student concerns, notices, lend & borrow, mess reviews and AI-assisted hostel
        insights.
      </p>
      <div className="grid">
        <article>
          <b>Concerns</b>
          <p>Raise and track hostel problems.</p>
        </article>
        <article>
          <b>AI Insights</b>
          <p>Prioritize urgent complaints and summarize repeated issues.</p>
        </article>
        <article>
          <b>Notice Board</b>
          <p>See important hostel announcements.</p>
        </article>
        <article>
          <b>Community</b>
          <p>Lend and borrow useful items.</p>
        </article>
        <article>
          <b>Mess</b>
          <p>Review food and track wastage.</p>
        </article>
      </div>
    </section>
  );
}
