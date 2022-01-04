import React from 'react'
import { Route, Routes, Navigate  } from 'react-router-dom'
import { } from 'react-router'
import Login from '../Features/auth/Login'
import ResetPassword from '../Features/auth/ResetPassword'
import ForgotPassword from '../Features/auth/Forgotpassword'
import Dashboard from '../Features/dashboard/Pages/Index';

// components
import Index from '../Features/dashboard/Pages/Dashboard';
import Users from '../Features/dashboard/Pages/Users';
import Pending from '../Features/dashboard/Pages/Pending';
import Transactions from '../Features/dashboard/Pages/Transactions';

export default function AuthenticationRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} >
                <Route path="" element={<Index />}  />
                <Route path="Users" element={<Users />}  />
                <Route path="Pending" element={<Pending />}  />
                <Route path="transactions" element={<Transactions />}  />
            </Route>
        </Routes>
    )
}
