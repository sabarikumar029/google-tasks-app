import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { useParams } from 'react-router-dom';

const ListTask=()=>{

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const {list}= useParams();

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
      }, [list]);
    
    
        const loadTasks = async () => {
            try {
              const tokenObject = gapi.client.getToken();
              console.log('tokenObject',tokenObject);
              const response = await fetch(
                `https://tasks.googleapis.com/tasks/v1/lists/${list}/tasks`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${tokenObject?.access_token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await response.json();
              console.log("tal",data);
              if (data) {
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
    
          console.log("tasks",tasks)
return(
    <div>

    </div>
)
}

export default ListTask