// /components/TaskCard.js
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
// import TaskCard from './TaskCard';
import { useGapi } from "../contexts/GoogleApiContext";
import { Outlet } from "react-router-dom";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { formatDate } from "../utils/common";
import {  toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskCard({ task, loadTasks, setIsLoading }) {
  const [selectedTask, setSelectedTask] = useState();
  const [subTask, setSubtask] = useState([]);
  const style = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  /**
   * To get the subtask
   * @param {string} taskListId
   */
  const getTaskById = async (taskListId) => {
    try {
      setIsLoading(true);
      const tokenObject = gapi.client.getToken();
      const response = await fetch(
        `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`,
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
        console.log(" sub task List", data?.items);
        const dup = data.items
          ?.map((ele) => {
            ele.isOpened = false;
            if (!ele?.parent) {
              ele.subTaskList = data?.items?.filter(
                (item) => item?.parent && ele?.id === item?.parent
              );
              return ele;
            } else {
              return null;
            }
          })
          .filter((ele) => ele);
        setSubtask(dup || []);
      } else {
        setSubtask([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * To complete the task
   * @param {string} tasklistId
   * @param {string} taskId
   */
  const handlerCompleteTask = async (tasklistId, taskId) => {
    try {
      setIsLoading(true);
      setSelectedTask(taskId);
      const tokenObject = gapi.client.getToken();
      const response = await fetch(
        `https://tasks.googleapis.com/tasks/v1/lists/${tasklistId}/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${tokenObject?.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "completed",
          }),
        }
      );
      await response.json();
      loadTasks();
      toast("Task completed successfully", style);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (selectedTask) {
      getTaskById(selectedTask);
    }
  }, [task]);

  return (
    <div className="main-card-section hover:shadow-lg">
      <div className="list-card task-card bg-gray p-6 rounded-lg  transition-all mx-1">
        <div
          className="card-section"
          onClick={() => {
            if (subTask?.length > 0) {
              setSubtask([]);
            } else {
              getTaskById(task?.id);
            }
          }}
        >
          <h3 className="text-lg font-semibold capitalize text-gray-800 mb-2">
            {task.title}
          </h3>
          <span
            className={`arrow-icon icon ${
              subTask?.length > 0 ? "active-arrow" : ""
            }`}
          >
            <ArrowRightOutlinedIcon />
          </span>
        </div>
        {subTask?.length > 0 && (
          <p className="text-gray-600 font-semibold capitalize text-sm">{`Tasks: ${subTask?.length}`}</p>
        )}
      </div>
      {subTask?.length > 0 && (
        <>
          <div class="sub-task-container">
            {subTask?.map((ele) => {
              return (
                <div className="sub_task">
                  {/* <p className='main_sub_title text-sm font-semibold uppercase mb-2'>Tasks</p> */}
                  <div className="sub-main-cont">
                    <div className="sub-main">
                      <p className="sub_title_task text-sm font-semibold uppercase">
                        {ele?.title}
                      </p>
                      {ele?.subTaskList?.length > 0 && (
                        <p className="text-gray-600 font-semibold capitalize text-sm mt-2">
                          {`Sub Tasks: ${ele?.subTaskList?.length}`}
                        </p>
                      )}
                      {ele?.due && (
                        <div className="due_time">
                          <span className="calender-icon icon text-sm text-gray-600 font-semibold">
                            Due Date:
                          </span>
                          <p className="time_date text-sm">
                            {formatDate(ele?.due)}
                          </p>
                        </div>
                      )}
                    </div>

                    {ele?.status === "completed" ? (
                      <button className="complete text-sm" disabled={true}>
                        <span className="taskalt">
                          <TaskAltIcon />
                        </span>
                        Finished
                      </button>
                    ) : (
                      <button
                        className="complete text-sm"
                        onClick={() => handlerCompleteTask(task?.id, ele?.id)}
                      >
                        Finish
                      </button>
                    )}
                  </div>
                  <p className="sub_title_desc text-sm">{ele?.notes}</p>

                  {subTask?.length > 0 && (
                    <>
                      <div className="sub-task-container container1">
                        {ele?.subTaskList?.map((item) => {
                          return (
                            <div className="sub_task1">
                              {/* <p className='main_sub_title text-sm font-semibold uppercase mb-2'>Tasks</p> */}

                              <div className="sub-main-cont">
                                <div className="sub-main">
                                  <p className="sub_title_task text-sm font-semibold uppercase">
                                    {item?.title}
                                  </p>
                                  {item?.due && (
                                    <div className="due_time">
                                      <span className="calender-icon icon text-sm text-gray-600 font-semibold">
                                        Due Date:
                                      </span>
                                      <p className="time_date text-sm">
                                        {formatDate(item?.due)}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                {item?.status === "completed" ? (
                                  <button
                                    className="complete text-sm"
                                    disabled={true}
                                  >
                                    <span className="taskalt">
                                      <TaskAltIcon />
                                    </span>
                                    Finished
                                  </button>
                                ) : (
                                  <button
                                    className="complete text-sm"
                                    onClick={() =>
                                      handlerCompleteTask(task?.id, item?.id)
                                    }
                                  >
                                    Finish
                                  </button>
                                )}
                              </div>

                              <p className="sub_title_desc text-sm">
                                {item?.notes}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      
    </div>
  );
}

export default TaskCard;
