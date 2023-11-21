import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../graphql/mutations';
import { GET_EVENTS_QUERY } from '../../graphql/queries';

const EventForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  // Mutation hook for creating an event
  const [createEvent, { loading, error, data }] = useMutation(CREATE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS_QUERY }], // Refetch event data after mutation
  });

  // Handle input changes and update form data
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Call the createEvent mutation with form data variables
    createEvent({
      variables: {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
      },
    })
      .then(({ data }) => {
        console.log('Event created:', data.createEvent);
      })
      .catch((error) => {
        // Log and alert for any errors during the mutation
        console.error('Error creating event:', error);
        console.error('GraphQL error details:', error.graphQLErrors);
        alert('Error creating event. Please try again.');
      });
  };

  // Render the form
  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Title input */}
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <br />

        {/* Description textarea */}
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />

        {/* Date input */}
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <br />

        {/* Location input */}
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </label>
        <br />

        {/* Submit button */}
        <button type="submit" disabled={loading}>
          Create Event
        </button>

        {/* Display error message if there's an error */}
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default EventForm;