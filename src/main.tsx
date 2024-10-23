import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Home from './component/Home.tsx'
import Cart from './component/Cart.tsx'
import { store } from './app/store.ts'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/cart',
        element:<Cart></Cart>
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}>
   <RouterProvider router={router} />
   </Provider>
   <Toaster />
  </StrictMode>,
)
