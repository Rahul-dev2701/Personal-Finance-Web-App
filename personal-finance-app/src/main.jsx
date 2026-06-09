import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import Overview from './pages/Overview/Overview.jsx';
import Transactions from './pages/Transactions/Transactions.jsx';
import Income from './pages/Income/Income.jsx';
import Expenses from './pages/Expenses/Expenses.jsx';
import Loans from './pages/Loans/Loans.jsx';
import Settings from './pages/Settings/Settings.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "income",
        element: <Income />,
      },
      {
        path: "expenses",
        element: <Expenses />,
      },
      {
        path: "loans",
        element: <Loans />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
