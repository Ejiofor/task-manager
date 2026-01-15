import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateTask = () => {
  const [task, setTask] = useState({ title: '', description: '' });
  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/taskServices/api/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch task details', 'error');
      }
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/taskServices/api/tasks/${taskId}`, task);
      Swal.fire({
        icon: 'success',
        title: 'Successfully updated',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to update task', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update Task</button>
    </form>
  );
};

export default UpdateTask;