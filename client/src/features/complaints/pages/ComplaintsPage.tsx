import { useState } from "react";

const categories = [
  "HEALTH",
  "MAINTENANCE",
  "ELECTRICITY",
  "PLUMBING",
  "CLEANLINESS",
  "WATER",
  "INTERNET",
  "SECURITY",
  "MESS",
  "OTHER",
];

export function ComplaintsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("OTHER");
  const [message, setMessage] = useState("");

  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const res = await fetch("http://localhost:5000/api/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ title, description, category }),
    });
    const data = await res.json();
    setMessage(data.message ?? "Submitted");
    if (res.ok) {
      setTitle("");
      setDescription("");
    }
  }

  return (
    <section className="card">
      <h1>Student Concerns</h1>
      <p>
        Raise health, maintenance, electricity, plumbing, cleanliness and other hostel concerns. AI
        will estimate urgency and priority when configured.
      </p>
      <form onSubmit={submit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Complaint title"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the problem"
          required
        />
        <button type="submit">Submit Concern</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
}
