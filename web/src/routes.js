import React, {useEffect} from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { useToasts } from 'react-toast-notifications'
import socketio from 'socket.io-client'

import HomeMap from './pages/HomeMap';
import Add from './pages/Add';

const Routes = () => {
  const { addToast } = useToasts();
  useEffect(() => {
    const io = socketio.connect(process.env.REACT_APP_API_URL);
    io.on("new", function (message) {
      addToast(message, { appearance: 'info' })
    });

  }, [])
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomeMap} />
        <Route path="/add" component={Add} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;