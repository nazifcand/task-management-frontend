import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Organizations from './pages/organizations/organizations';
import Projects from './pages/projects/projects';
import Tasks from './pages/tasks/tasks';
import CreateTask from './pages/tasks/createTask';
import EditTask from './pages/tasks/editTask';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/organizations',
        element: <Organizations />,
      },

      {
        path: '/organizations/:organizationSlug/projects',
        element: <Projects />,
      },

      {
        path: '/organizations/:organizationSlug/projects/:projectSlug/tasks',
        element: <Tasks />,
      },
      {
        path: '/organizations/:organizationSlug/projects/:projectSlug/tasks/create',
        element: <CreateTask />,
      },
      {
        path: '/organizations/:organizationSlug/projects/:projectSlug/tasks/:taskId/edit',
        element: <EditTask />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
