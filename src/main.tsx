import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Organizations from './pages/organizations/organizations';
import OrganizationProjects from './pages/organizationDetail/OrganizationProjects';
import OrganizationDetail from './pages/organizationDetail/organizationDetail';
import OrganizationUsers from './pages/organizationDetail/OrganizationUsers';
import ProjectDetail from './pages/projectDetail/projectDetail';
import EditProjectTask from './pages/projectDetail/tasks/editProjectTask';
import CreateProjectTask from './pages/projectDetail/tasks/createProjectTask';
import ProjectTasks from './pages/projectDetail/tasks/projectTasks';
import ProjectTags from './pages/projectDetail/projectTags/projectTags';
import ProjectStatuses from './pages/projectDetail/projectStatuses/projectStatuses';
import CreateProjectStatus from './pages/projectDetail/projectStatuses/createProjectStatus';
import EditProjectStatus from './pages/projectDetail/projectStatuses/editProjectTask';
import CreateProjectTag from './pages/projectDetail/projectTags/createProjectTag';
import EditProjectTag from './pages/projectDetail/projectTags/editProjectTag';
import CreateOrganization from './pages/organizations/createOrganization';
import EditOrganization from './pages/organizations/editOrganization';
import CreateOrganizationProject from './pages/organizationDetail/createOrganizationProject';
import EditOrganizationProject from './pages/organizationDetail/editOrganizationProject';

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
        path: '/organizations/create',
        element: <CreateOrganization />,
      },
      {
        path: '/organizations/:organizationSlug/edit',
        element: <EditOrganization />,
      },

      {
        path: '/organizations/:organizationSlug',
        element: <OrganizationDetail />,
        children: [
          {
            path: '/organizations/:organizationSlug/projects',
            element: <OrganizationProjects />,
          },
          {
            path: '/organizations/:organizationSlug/projects/create',
            element: <CreateOrganizationProject />,
          },
          {
            path: '/organizations/:organizationSlug/projects/:projectSlug/edit',
            element: <EditOrganizationProject />,
          },
          {
            path: '/organizations/:organizationSlug/users',
            element: <OrganizationUsers />,
          },
        ],
      },
      {
        path: '/organizations/:organizationSlug/projects/:projectSlug',
        element: <ProjectDetail />,
        children: [
          {
            path: '/organizations/:organizationSlug/projects/:projectSlug/tasks',
            element: <ProjectTasks />,
          },
          {
            path: '/organizations/:organizationSlug/projects/:projectSlug/tasks/create',
            element: <CreateProjectTask />,
          },
          {
            path: '/organizations/:organizationSlug/projects/:projectSlug/tasks/:taskId/edit',
            element: <EditProjectTask />,
          },

          {
            path: '/organizations/:organizationSlug/projects/:projectSlug/tags',
            element: <ProjectTags />,
          },
          {
            path: '/organizations/:organizationSlug/projects/:projectSlug/tags/create',
            element: <CreateProjectTag />,
          },
          {
            path: '/organizations/:organizationSlug/projects/:projectSlug/tags/:tagId/edit',
            element: <EditProjectTag />,
          },

          {
            path: '/organizations/:organizationSlug/projects/:projectSlug/statuses',
            element: <ProjectStatuses />,
          },
          {
            path: '/organizations/:organizationSlug/projects/:projectSlug/statuses/create',
            element: <CreateProjectStatus />,
          },
          {
            path: '/organizations/:organizationSlug/projects/:projectSlug/statuses/:statusId/edit',
            element: <EditProjectStatus />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
