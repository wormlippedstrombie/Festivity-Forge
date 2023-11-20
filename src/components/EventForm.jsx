import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../graphql/mutations';
import { GET_EVENTS_QUERY } from '../../graphql/queries';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS_QUERY }],
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

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
        console.error('Error creating event:', error);
        alert('Error creating event. Please try again.');
      });
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleFormSubmit}>
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
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
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
        <button type="submit" disabled={loading}>
          Create Event
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default EventForm;