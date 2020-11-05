import React from 'react'
import Routes from './routes'
import { ToastProvider } from 'react-toast-notifications'

import './global.css'

export default function App() {

  return (
    <ToastProvider>
      <Routes/>
    </ToastProvider>
  );
}