import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { SuspenseLoader } from '../components/loaders';
import ScrollToTop from '../shared/utils/scrollTop';

const Loader =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) =>
    (
      <Suspense fallback={<SuspenseLoader />}>
        <ScrollToTop />
        <Component {...props} />
      </Suspense>
    );

const PrivateRoute = Loader(lazy(() =>  import('../modules/privateRoute')));
const SignUp = Loader(lazy(() =>  import('../modules/auth/signUp')));
const SignIn = Loader(lazy(() =>  import('../modules/auth/signIn')));
const Home = Loader(lazy(() =>  import('../modules/home/Home')));

const routes = createBrowserRouter([
  {
    path: '',
    children: [
      {
        path: '/',
        element: <SignIn />
      },
      {
        path: '/SignIn',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/home',
            element: <Home />,
          },
        ]
      }
    ]
  },
]);

export default routes;
