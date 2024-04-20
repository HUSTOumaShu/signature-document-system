import React from 'react';
import HomePage from '../pages/HomePage';
import InboxPage from '../pages/DocumentPage/InboxPage';
import SentPage from '../pages/DocumentPage/SentPage';
import DraftPage from '../pages/DocumentPage/DraftPage';
import DeletedPage from '../pages/DocumentPage/DeletedPage';
import PrepareDocument from '../pages/PrepareDocument';
import ViewDocument from '../pages/ViewDocument';
import UserPage from '../pages/UserPage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PasswordReset from '../pages/PasswordReset';

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
        path: '/prepare',
        element: <PrepareDocument />
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