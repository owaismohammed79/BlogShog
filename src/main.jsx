import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import Protected from "./components/Protected.jsx"
import Home from "./pages/Home.jsx";
import MyPosts from "./pages/MyPosts.jsx";
import EditPost from "./pages/EditPost.jsx";
import LoginPg from "./pages/LoginPg.jsx";
import Post from "./pages/Post.jsx";
import SignupPg from "./pages/SignupPg.jsx";
import AddPost from "./pages/AddPost.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Protected authentication>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication= {false}>
            <LoginPg />
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication= {false}>
            <SignupPg />
          </Protected>
        )
      },
      {
        path: "/my-posts",
        element: (
          <Protected authentication>
            <MyPosts />
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            <AddPost />
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            <EditPost />
          </Protected>
        )
      },
      {
        path: "/posts/:slug",
        element: <Post />
      }

    ]
  }
])

//Watch the syntax of createBrowserRouter it takes in a array of objects and observe very carefully that we are rendering the App component in the / route and inside that we are rendering the Home component, this is coz the App component encloses the outlet compoenent b/w the header and the footer and as it should render the Home component in the same page hence it's child has also got the same route

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>{/*Store provider */}
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)