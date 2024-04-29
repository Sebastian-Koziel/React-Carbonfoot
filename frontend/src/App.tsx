
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "./components/home/Home"
import LoginForm from "./components/login/Login";
import Register from "./components/register/Register";
import DashboardRoot from './components/dashboard/root/DashboardRoot'
import Summary from './components/dashboard/summary/Summary'
import EmissionFactors from './components/dashboard/emissionFactors/EmissionFactors'
import Raports from './components/dashboard/raports/Raports'
import Products from './components/dashboard/products/Products'



const App = () => {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:<LoginForm/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path: "/dashboard",
      element: <DashboardRoot/>,
      children: [
        {
        index: true,
        element: <Summary />
        },
        {
          path: "emmisionFactors",
          element: <EmissionFactors />
        },
        {
          path: "raports",
          element: <Raports />
        },
        {
          path: "products",
          element: <Products />
        },

      ]
    }
    
  ])

  return <RouterProvider router={router} />;
}

export default App