import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import './index.css'
import "./main.scss"
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import AppRouter from "./route";
import store from '@/store'
import { Provider } from 'react-redux'

console.log(AppRouter, "AppRouter")
const router = createBrowserRouter([
  { path: "*", Component: AppRouter },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
