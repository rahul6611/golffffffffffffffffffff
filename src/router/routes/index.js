import { lazy } from 'react'

// ** Document title
const TemplateTitle = 'DOPE GOLF'

// ** Default Route
const DefaultRoute = '/home'

const admin = localStorage.getItem("isAdmin") === "true" ? true : false

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/home/Home')),
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/authentication/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/reset-password',
    component: lazy(() => import('../../views/authentication/ResetPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/otp',
    component: lazy(() => import('../../views/authentication/Otp')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/admin',
    component: lazy(() => import('../../views/superadmins/SuperAdmin'))
  },
  {
    path: '/addadmin',
    component: lazy(() => import('../../views/superadmins/AddSuperAdmin')),
  },
  {
    path: '/introducers/:id',
    component: lazy(() => import('../../views/introducer-profile/index.js'))
  },
  {
    path: '/introducers',
    component: lazy(() => import('../../views/introducer/Introducers'))
  },
  {
    path: '/addintroducer',
    component: lazy(() => import('../../views/introducer/AddIntroducer')),
  },
  {
    path: '/addplayer',
    component: lazy(() => import('../../views/golf-players/AddPlayer')),
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/account-settings/Profile')),
  },
  {
    path: '/golf-players',
    component: lazy(() => import('../../views/golf-players/index')),
  },
  {
    path: '/end-users/:id',
    component: lazy(() => import('../../views/end-users/Player')),
  },
  {
    path: '/end-users',
    component: lazy(() => import('../../views/end-users/index')),
  },
  {
    path: '/update-player/:id',
    component: lazy(() => import('../../views/end-users/UpdatePlayer')),
  },
  {
    path: '/clubs',
    component: lazy(() => import('../../views/clubs/index')),
  },
  {
    path: '/addclub',
    component: lazy(() => import('../../views/clubs/AddClub')),
  },
  {
    path: '/updateclub/:id',
    component: lazy(() => import('../../views/clubs/UpdateClub')),
  },
  {
    path: '/calculator',
    component: lazy(() => import('../../views/test/Calculator')),
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
