import { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { routes } from '@/constants';
import { useEmployeeContext } from 'src/contexts';
const SignIn = lazy(() => import('../pages/SignIn'));
const Calendar = lazy(() => import('../pages/Calendar/Calendar'));
const ManagerProfile = lazy(() => import('../pages/ManagerProfile/ManagerProfile'));
const InstallerProfile = lazy(() => import('../pages/InstallerProfile'));
const EditInstaller = lazy(() => import('../pages/EditInstaller/EditInstaller'));
const CreateInstaller = lazy(() => import('../pages/CreateInstaller'));

function NavigateToSignIn() {
  return <Navigate to={routes.signIn} />;
}

export function Router() {
  // employeeContext
  const { employee, isManager } = useEmployeeContext();
  const isSignedIn = !!employee;

  // routes
  const routesObject: RouteObject[] = [
    {
      path: '/',
      element: isSignedIn ? <Navigate to={routes.profile} /> : <NavigateToSignIn />
    },
    {
      path: routes.signIn,
      element: <SignIn />
    },
    {
      path: routes.calendar,
      element: isSignedIn ? <Calendar /> : <NavigateToSignIn />
    },
    {
      path: routes.profile,
      element: isSignedIn ? (
        isManager ? (
          <ManagerProfile />
        ) : (
          <InstallerProfile />
        )
      ) : (
        <NavigateToSignIn />
      )
    },
    {
      path: `${routes.employee}/:id`,
      element: isSignedIn && isManager ? <EditInstaller /> : <NavigateToSignIn />
    },
    {
      path: routes.newEmployee,
      element: isSignedIn && isManager ? <CreateInstaller /> : <NavigateToSignIn />
    },
    {
      path: '*',
      element: <NavigateToSignIn />
    }
  ];

  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routesObject)}</Suspense>;
}
