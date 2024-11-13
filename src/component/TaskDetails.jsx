// /components/TaskDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';

function TaskDetails() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        // apiKey: 'YOUR_GOOGLE_API_KEY',
        clientId: '576946412844-uvd1heouvqe545juvcv5aq5dagca567r.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/tasks',
      }).then(() => {
        loadTaskDetails();
      });
    });
  }, [taskId]);

  const loadTaskDetails = () => {
    gapi.client.load('tasks', 'v1', () => {
      gapi.client.tasks.tasks.get({
        tasklist: '@default',
        task: taskId,
      }).then((response) => {
        setTask(response.result);
        setLoading(false);
      }).catch((error) => {
        console.error("Error fetching task details: ", error);
        setLoading(false);
      });
    });
  };

  const markAsCompleted = () => {
    gapi.client.tasks.tasks.update({
      tasklist: '@default',
      task: taskId,
      status: 'completed',
    }).then(() => {
      navigate('/tasks'); // Redirect back to task list
    }).catch((error) => {
      console.error("Error marking task as completed: ", error);
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading task details...</p>
      ) : (
        <div className="task-details">
          <h3>{task.title}</h3>
          <p>Due: {task.due ? new Date(task.due).toLocaleString() : 'N/A'}</p>
          <p>{task.notes ? task.notes : 'No additional notes'}</p>
          <button onClick={markAsCompleted}>Mark as Completed</button>
        </div>
      )}
    </div>
  );
}

export default TaskDetails;
