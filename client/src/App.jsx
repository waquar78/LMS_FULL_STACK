import React from 'react'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import HeroSection from './pages/student/HeroSection.jsx'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout.jsx'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses.jsx'
import MyLearning from './pages/student/MyLearning.jsx'
import Profile from './pages/student/Profile.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Slidebar from './pages/admin/Slidebar.jsx'
import CourseTable from './pages/admin/courses/CourseTable.jsx'
import AddCourse from './pages/admin/courses/AddCourse.jsx'
import EditCourse from './pages/admin/courses/EditCourse.jsx'
import CreateLecture from './pages/admin/courses/lectures/CreateLecture.jsx'
import EditLecture from './pages/admin/courses/lectures/EditLecture.jsx'
import CourseDetail from './pages/student/CourseDetail.jsx'
import Payment from './pages/student/Payment.jsx'
import CourseProgress from './pages/student/CourseProgress.jsx'
import SearchPage from './pages/student/SearchPage.jsx'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoute.jsx'
import PurchaseCourseProtectedRoute from './components/PurchasedCourseProtectedRoute.jsx'
import { ThemeProvider } from './components/ThemeProvider.jsx'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            {/* cources */}
            <Courses />
          </>
        )

      },
      {
        path: "login",
        element: <AuthenticatedUser><Login /></AuthenticatedUser>
      },
      {
        path: "mylearning",
        element: <ProtectedRoute><MyLearning /></ProtectedRoute>
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: "course/search",
        element: <ProtectedRoute><SearchPage /></ProtectedRoute>
      },
      {
        path: "course-detail/:courseId",
        element: <ProtectedRoute><CourseDetail /></ProtectedRoute>
      },
      {
        path: "/payment/:courseId",
        element: <Payment />
      },
      {
        path: "/course-progress/:courseId",
        element: <ProtectedRoute>
          <PurchaseCourseProtectedRoute>

            <CourseProgress />
          </PurchaseCourseProtectedRoute>
        </ProtectedRoute>
      },
      {
        path: "admin",
        element: <AdminRoute><Slidebar /></AdminRoute>,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "courses",
            element: <CourseTable />
          },
          {
            path: "courses/create",
            element: <AddCourse />
          },
          {
            path: "courses/:courseId",
            element: <EditCourse />
          },
          {
            path: "courses/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "courses/:courseId/lecture/:lectureId",
            element: <EditLecture />
          }
        ]
      }

    ],

  }

])

const App = () => {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  )
}

export default App
