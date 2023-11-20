import React, { useState, useEffect } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the GraphQL server
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            events {
              _id
              title
              description
              date
              location
            }
          }
        `,
      }),
    })
      .then((response) => response.json())
      .then((data) => setEvents(data.data.events))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.title} - {event.date} - {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;