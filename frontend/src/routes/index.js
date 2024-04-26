import React from 'react';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PasswordReset from '../pages/PasswordReset';

import HomePage from '../pages/HomePage';
import InboxPage from '../pages/DocumentPage/InboxPage';
import SentPage from '../pages/DocumentPage/SentPage';
import DraftPage from '../pages/DocumentPage/DraftPage';
import DeletedPage from '../pages/DocumentPage/DeletedPage';
import Assign from '../pages/Assign';
import ViewDocument from '../pages/ViewDocument';
import SignDocument from '../pages/SignDocument';
import UserPage from '../pages/UserPage';
import PrepareDocument from '../pages/PrepareDocument';

export const publicRoutes = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/document/inbox',
        element: <InboxPage />
    },
    {
        path: '/document/sent',
        element: <SentPage />
    },
    {
        path: '/document/draft',
        element: <DraftPage />
    },
    {
        path: '/document/deleted',
        element: <DeletedPage />
    },
    {
        path: '/assign',
        element: <Assign />
    },
    {
        path: '/prepare',
        element: <PrepareDocument />
    },
    {
        path: '/sign',
        element: <SignDocument />
    },
    {
        path: '/viewDocument',
        element: <ViewDocument />
    },
    {
        path: 'users',
        element: <UserPage />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/resetPassword',
        element: <PasswordReset />
    }
]

export const privateRoutes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/resetPassword',
        element: <PasswordReset />
    },
    {
        path: '/*',
        element: <Login />
    }
]