import React, { useState } from 'react';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form data (you can add more specific validation logic)
    if (!formData.title || !formData.date || !formData.location) {
      alert('Please fill in all required fields.');
      return;
    }

    // Send mutation to create an event with query variables
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation ($title: String!, $description: String!, $date: String!, $location: String!) {
            createEvent(
              title: $title,
              description: $description,
              date: $date,
              location: $location
            ) {
              _id
              title
              description
              date
              location
            }
          }
        `,
        variables: {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          location: formData.location,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Event created:', data.data.createEvent);
        // Add logic to update the UI or reset the form if needed
      })
      .catch((error) => {
        console.error('Error creating event:', error);
        // Display a user-friendly error message to the user
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
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;