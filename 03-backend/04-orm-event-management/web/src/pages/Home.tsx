import { useState, useEffect } from "react";
import { Link } from "react-router";

interface Event {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

function Home() {
  const [events, setEvents] = useState<null | Event[]>(null);

  useEffect(() => {
    async function getEvents() {
      const res = await fetch(`http://localhost:8000/api/events`, {
        method: "GET",
      });
      const data = await res.json();
      setEvents(data);
    }

    getEvents();
  }, []);

  if (!events) {
    return (
      <main>
        <h2>Welcome to Eventify</h2>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main>
      <h2>Welcome to Eventify</h2>

      <div>
        {events.map((event) => (
          <article key={event.id}>
            <img src={event.imageUrl} alt="" />
            <h3>{event.title}</h3>
            <p>{event.price}</p>
            <p>{event.description.slice(0, 25) + "..."}</p>

            <Link to={`/events/${event.id}`}>Read more</Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Home;
