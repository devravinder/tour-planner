import { Navigate, useRoutes } from "react-router";
import PageLoader from "components/PageLoader";
import { ElementType, lazy, Suspense } from "react";
import AuthGuard from "guards/AuthGuard";
import PublicGuard from "guards/PublicGuard";
import AuthLayout from "layout/auth/AuthLayout";
import MainLayout from "layout/main/MainLayout";
import "./path";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Routes() {
  const RoutedComponent = useRoutes([
    {
      path: "auth",
      element: (
        <PublicGuard>
          <AuthLayout />
        </PublicGuard>
      ),
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "", element: <Navigate to="login" replace /> },
      ],
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <MainLayout></MainLayout>
        </AuthGuard>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/tours",
          element: <TourPage />,
          children: [
            { path: "", element: <Navigate to="list" replace /> },
            { path: "list", element: <TourListPage /> },
            { path: "new", element: <TourDetailsPage /> },
            { path: ":id", element: <TourDetailsPage /> },
          ],
        },
      ],
    },
    { path: "404", element: <Page404></Page404> },
    { path: "500", element: <Page500></Page500> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);

  return RoutedComponent;
}

// auth layout pages
const LoginPage = Loadable(lazy(() => import("../pages/auth/LoginPage")));

// main layout pages
const HomePage = Loadable(lazy(() => import("../pages/home/HomePage")));
const TourPage = Loadable(lazy(() => import("../pages/tour/TourPage")));
const TourListPage = Loadable(
  lazy(() => import("../pages/tour/list/TourListPage")),
);
const TourDetailsPage = Loadable(
  lazy(() => import("../pages/tour/details/TourDetailsPage")),
);

// error pages
const Page404 = Loadable(lazy(() => import("../pages/error/Page404")));
const Page500 = Loadable(lazy(() => import("../pages/error/Page500")));
