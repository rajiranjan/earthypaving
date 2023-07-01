import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const AdminPanel = () => {
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    axios.get('/api/event-dates').then((response) => {
      setEventDates(response.data);
    });
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {eventDates.map((eventDate) => (
          <tr key={eventDate.id}>
            <td>{eventDate.start}</td>
            <td>{eventDate.end}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminPanel;
