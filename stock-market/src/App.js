import React,{useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Topbar from './components/Navigation/Topbar/Topbar'
import Home from './components/Home/Home'
import StockDetail from './components/Stocks/Stock/StockDetail'
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
      <Route path="/stocks/:symbol" exact component={StockDetail}></Route>
      <Redirect to='/' />
    </Switch>
  )
  return (
    <div>
      <Topbar drawerToggleClicked={sideDrawerHandler}></Topbar>
      <SideDrawer show={showSideDrawer} sideDrawerClicked={sideDrawerClose}></SideDrawer>
      {routes}
    </div>
  );
}

export default App;
