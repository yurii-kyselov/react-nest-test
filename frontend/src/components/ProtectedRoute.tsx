import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
  redirectPath: string;
  children: JSX.Element;
}

export default function ProtectedRoute({ redirectPath, children }: ProtectedRouteProps) {
  const { auth } = useSelector((store: RootState) => store);

  if (auth.isAuthenticated === false) {
    return <Navigate to={redirectPath} replace />;
  }

  if (auth.isAuthenticated === undefined) return null;

  return children || <Outlet />;
}
