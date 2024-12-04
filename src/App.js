import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./components/RootLayout";
import {Errorelement} from "./components/Errorelement";
import {ListEmployeeComponent} from "./components/ListEmployeeComponent";
import {CreateEmployeeComponent} from "./components/CreateEmployeeComponent";
import {EmpsLoader} from "./components/EmpsLoader";
function App() {
  return (
      <RouterProvider router={router} />
  );
}
export const router=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    errorElement:<Errorelement/>,
    children:[
      {
        index:true,
        element:<ListEmployeeComponent/>,
      },
      {
        path:"/add-emp",
        element:<CreateEmployeeComponent/>
      },
      {
        path:"/emp-list",
        element:<ListEmployeeComponent/>,
        loader:EmpsLoader
      }
    ]
  }
])
export default App;
