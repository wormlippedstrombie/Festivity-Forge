// EventList.js
import React from 'react';

const EventList = ({ events }) => {
  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;