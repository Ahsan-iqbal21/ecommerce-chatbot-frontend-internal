// Import necessary dependencies
import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import LoginLayout from '../layout/LoginLayout';
import MainLayout from '../layout/MainLayout';

// Import your components and layouts
import Loadable from '../components/Loadable';
import { ProtectedRoute } from './protectedRoute';
import NotFound from '../pages/NotFound';

const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const AddDocument = Loadable(lazy(() => import('../pages/main/AddDocument')));
const DocumentsList = Loadable(lazy(() => import('../pages/main/DocumentsList')));
const Chat = Loadable(lazy(() => import('../pages/main/Chat')));

const routes = [
    {
      path: '/',
      element: <LoginLayout />,
      children: [
        { path: '/', element: <Login /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/chat',
          element: (
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          )
        },
        {
          path: '/documents/add',
          element: (
            <ProtectedRoute>
              <DndProvider backend={HTML5Backend}>
                <AddDocument />
              </DndProvider>
            </ProtectedRoute>
          )
        },
        {
            path: '/documents/list',
            element: (
              <ProtectedRoute>
                <DocumentsList />
              </ProtectedRoute>
            )
        },
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
];
  
// Routing Render Function
export default function ThemeRoutes() {
    return useRoutes([...routes]);
}
  
