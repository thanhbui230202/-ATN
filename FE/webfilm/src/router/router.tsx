import { RouteObject, createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/Signup';
import AdminLayout from '../pages/AdminLayout';
import DashboardPage from '../app/DashBoardPage';
import Users from '../app/users/UserPage';
import Films from '../app/films/MoviePage';
import Categories from '../app/categories/CategoriesPage';
import PrivateRoute from './private';
import MovieDetailPage from '../app/films/MovieDetail';
import BookingPage from '../app/booking/BookingPage';
import ProfilePage from '../pages/Profile';
import AccountUpdate from '../pages/AccountUpdate';
import ChangePassword from '../pages/ChangePassword';
import App from '../pages/App';
// import CreateFilm from '../app/films/MovieCreate';
// import CreateCategory from '../app/categories/CategoriesCreate';
const routes: RouteObject[] = [
  {
    path: '',
    element: <App></App>,
    children:[
      {path:"/",element: <LandingPage/>},
      {path:"user-profile",element: <ProfilePage/>},
      {path:"user-update",element: <AccountUpdate/>},
      {path:"change-password",element: <ChangePassword/>}
    ],
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage> ,
  },
  {
    path: '/signup',
    element: <SignUpPage></SignUpPage> ,
  },
  {
    path: '/detail/:movieId',
    element: <MovieDetailPage></MovieDetailPage> ,
  },
  {
    path: '/seat/:showtimeId',
    element: <BookingPage></BookingPage> ,
  }, 
  {
    path: '/user-update',
    element: <AccountUpdate></AccountUpdate> ,
  },
  {
    path: '/change-password',
    element: <ChangePassword></ChangePassword> ,
  },
  {
    path: '/admin',
    element:(
      <PrivateRoute requiredRole='ADMIN'>
        <AdminLayout></AdminLayout>
      </PrivateRoute>
    ) ,
    children: [
      { path: '', element: <DashboardPage></DashboardPage>},
      { path: 'users', element: <Users></Users> },
      { path: 'films', element: <Films></Films> },
      { path: 'categories', element: <Categories></Categories> },
      // { path: 'save', element: <CreateFilm></CreateFilm> },
      // { path: 'categories/save', element: <CreateCategory></CreateCategory> },
    ],
  },
];
// Create and export the router
const router = createBrowserRouter(routes);
export default router;
