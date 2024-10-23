import { lazy, Suspense } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useEmployeeContext } from 'src/contexts';
const SignIn = lazy(() => import('../pages/SignIn/SignIn'));
const Calendar = lazy(() => import('../pages/Calendar/Calendar'));
const ManagerProfile = lazy(() => import('../pages/ManagerProfile/ManagerProfile'));
const InstallerProfile = lazy(() => import('../pages/InstallerProfile'));
const EditInstaller = lazy(() => import('../pages/EditInstaller/EditInstaller'));
const CreateInstaller = lazy(() => import('../pages/CreateInstaller'));

function NavigateToSignIn() {
  return <Navigate to={ROUTES.signIn} />;
}

export function Router() {
  // employeeContext
  const { employee, isManager } = useEmployeeContext();
  const isSignedIn = !!employee._id;

  // ROUTES
  const RoutesObject: RouteObject[] = [
    {
      path: '/',
      element: isSignedIn ? <Navigate to={ROUTES.profile} /> : <NavigateToSignIn />
    },
    {
      path: ROUTES.signIn,
      element: <SignIn />
    },
    {
      path: ROUTES.calendar,
      element: isSignedIn ? <Calendar /> : <NavigateToSignIn />
    },
    {
      path: ROUTES.profile,
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
      path: `${ROUTES.employee}/:id`,
      element: isSignedIn && isManager ? <EditInstaller /> : <NavigateToSignIn />
    },
    {
      path: ROUTES.newEmployee,
      element: isSignedIn && isManager ? <CreateInstaller /> : <NavigateToSignIn />
    },
    {
      path: '*',
      element: <NavigateToSignIn />
    }
  ];

  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(RoutesObject)}</Suspense>;
}
