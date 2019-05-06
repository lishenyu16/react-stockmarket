import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import Topbar from './components/Navigation/Topbar/Topbar'
import Home from './components/Home/Home'

const app = (props)=>{
  let routes = (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      {/* <Route path="/auth" component={Auth}></Route> */}
      <Redirect to='/' />
    </Switch>
  )
  return (
    <div className="App">
      <Topbar></Topbar>
      {routes}
    </div>
  );
}

export default app;
