import React,{useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Topbar from './components/Navigation/Topbar/Topbar'
import Home from './components/Home/Home'
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer'

const App = (props)=>{
  const [showSideDrawer, setShowSideDrawer] = useState(false)
  
  const sideDrawerHandler = ()=>{
    setShowSideDrawer(!showSideDrawer)
  }
  const sideDrawerClose = ()=>{
    setShowSideDrawer(false)
  }

  let routes = (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      {/* <Route path="/auth" component={Auth}></Route> */}
      <Redirect to='/' />
    </Switch>
  )
  return (
    <div className="App">
      <Topbar drawerToggleClicked={sideDrawerHandler}></Topbar>
      <SideDrawer show={showSideDrawer} sideDrawerClicked={sideDrawerClose}></SideDrawer>
      {routes}
    </div>
  );
}

export default App;
