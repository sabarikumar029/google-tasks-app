// /components/TaskList.js
import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import TaskCard from './TaskCard';
import { useGapi } from '../contexts/GoogleApiContext';
import { Outlet } from 'react-router-dom';
import NoTask from '../assets/Reminders-pana.svg'
import { ToastContainer } from 'react-toastify';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { gapiInstance, isInitialized } = useGapi();
  const [isLoading, setIsLoading] = useState(false)
   const data = gapiInstance;
   console.log("gapiInstance",data,isInitialized)
  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        // apiKey: API_KEY,
        clientId: process.env.CLIENT_ID,
        scope: process.env.SCOPES,
      }).then((instance) => {
        gapi.auth2.getAuthInstance();
        loadTasks();
      });
    });
  }, []);


    const loadTasks = async () => {
        try {
            const tokenObject = gapi.client.getToken();
            console.log("gapi.client.getToken()",gapi.client.getToken())
          const response = await fetch(
            "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenObject?.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (data?.items) {
            setTasks(data.items || []);
          } else {
            setTasks([]);
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }finally{
            setLoading(false)
        }
      };


  return (
    <div className='h-screen max-w-7xl flex mx-auto w-screen flex-col w-100 px-6 py-4'>
        {isLoading && <div className="loading"></div>}

      <h3 className='flex w-100 mb-4 text-3xl font-bold'>Task list</h3>
      <div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
        <div className="task-list grid gap-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} loadTasks={loadTasks} setIsLoading={setIsLoading}  />
            ))
          ) : (
            <div className='no-task'>
            <p>No tasks found!</p>
            <img src={NoTask} alt='loading'></img>
            </div>
          )}
        </div>
        <div>
            <Outlet />
        <ToastContainer/>
        </div>
        </>
      )}
      </div>
    </div>
  );
}

export default TaskList;
