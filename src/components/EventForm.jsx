import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../graphql/mutations';
import { GET_EVENTS_QUERY } from '../../graphql/queries';
import '../styles/index.css'; // Import the global styles
import '../styles/EventForm.css'; // Import the specific CSS file for EventForm

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
    const { title, description, date, location } = formData;
    const formattedDate = new Date(date).toISOString().split('T')[0];

    createEvent({
      variables: {
        title,
        description,
        date: formattedDate,
        location,
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
      <div className="toolbar">
        <h1>Event Planner</h1>
      </div>
      <div className="event-form-container">
        <h2 className="form-heading">Create Event</h2>
        <form onSubmit={handleFormSubmit}>
          <label className="label">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input-field"
            />
          </label>
          <br />

          <label className="label">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="input-field"
            />
          </label>
          <br />

          <label className="label">
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="input-field"
            />
          </label>
          <br />

          <label className="label">
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="input-field"
            />
          </label>
          <br />

          <button type="submit" disabled={loading}>
            Create Event
          </button>

          {error && <p>Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EventForm;