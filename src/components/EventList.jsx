import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS_QUERY } from '../../graphql/queries';

const EventList = () => {
  const { loading, error, data } = useQuery(GET_EVENTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const events = data.events;

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