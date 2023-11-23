import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS_QUERY } from '../../graphql/queries';
import { UPDATE_EVENT, DELETE_EVENT } from '../../graphql/mutations'; // Import the mutations
import '../styles/index.css'; // Import the global styles

const EventList = () => {
  console.log('EventList component is rendering');
  const { loading, error, data, refetch } = useQuery(GET_EVENTS_QUERY);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Fetched data:', data); // Log the fetched data

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

  console.log('Formatted events:', events); // Log the formatted events

  const handleDelete = async (eventId) => {
    try {
      // Call the deleteEvent mutation with the event ID
      await deleteEvent({ variables: { id: eventId } });

      // Refetch the events after deletion
      refetch();
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };
  
  // const handleEdit = (eventId) => {
  //   // Add logic to edit the event with the specified ID
  //   console.log(`Editing event with ID: ${eventId}`);
  //   // Implement the actual edit functionality, e.g., navigate to an edit page
  // };

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{formatDate(event.date)}</td>
              <td>{event.location}</td>
              <td>
                {/* <button onClick={() => handleEdit(event._id)}>Edit</button> */}
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;