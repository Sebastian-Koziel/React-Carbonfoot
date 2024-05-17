
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "./components/home/Home"
import LoginForm from "./components/login/Login";
import Register from "./components/register/Register";
import DashboardRoot from './components/dashboard/root/DashboardRoot'
import Summary from './components/dashboard/summary/Summary'
import EmissionFactors from './components/dashboard/emissionFactors/EmissionFactors'
import Raports from './components/dashboard/raports/Raports'
import Products from './components/dashboard/products/Products'
import RegisterConfirmation from "./components/confirmation/Confirmation";
import Validation from "./components/confirmation/Validation";
import { tokenValidationLoader } from "./components/confirmation/EmailValidationFetch";
import { fetchFactors } from "./components/dashboard/emissionFactors/fetch/fetchFactors";
import AddRaport from "./components/dashboard/raports/AddRaport";
import RaportsRoot from "./components/dashboard/raports/Root";



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
      path:"/confirmation",
      element:<RegisterConfirmation/>,
    },
    {
      path: "/validation/:token",
      element: <Validation />,
      loader: tokenValidationLoader
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
          element: <EmissionFactors />,
          loader: fetchFactors
        },
        {
          path: "raports",
          element: <RaportsRoot />,
          children: [
            {
              index: true,
              element: <Raports />,
            },
            {
              path: "new",
              element: <AddRaport />,
            },
          ]
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