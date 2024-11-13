import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import HomePage from "../pages/HomePage";
import Login from "../component/Login";
import TaskList from "../component/TaskList";
import ListTask from "../component/ListTask";

const  combinedRoutes=createBrowserRouter([
        {
          path: "/",
          element: <BasicLayout />,
          children: [
            {
              path: "",
              element:<HomePage /> ,
            },
            {
                path:"login",
                element:<Login /> ,
            },
            {
                path:"tasks",
                element:<TaskList/>,
                children:[
                    {
                        path:":list",
                        element:<ListTask/>
                    }
                ]
            },
          ],
        },
      ]);

export default combinedRoutes