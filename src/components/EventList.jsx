import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS_QUERY } from '../../graphql/queries';
import '../styles/index.css'; // Import the global styles

const EventList = () => {
  const { loading, error, data } = useQuery(GET_EVENTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const events = data.events;

  const formatDate = (dateString) => {
    console.log('Original date string:', dateString);
  
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(parseInt(dateString));
  
    console.log('Parsed date:', date);
  
    // Check if the date is valid before formatting
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.title} - {formatDate(event.date)} - {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;