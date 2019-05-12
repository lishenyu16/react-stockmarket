import React,{useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Topbar from './components/Navigation/Topbar/Topbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import Logout from './components/Auth/Logout'
import StockDetail from './components/Stocks/Stock/StockDetail'
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

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
            <Route path="/auth" exact component={Auth}></Route>
            <Route path="/stocks/:symbol" exact component={StockDetail}></Route>
            <Redirect to='/' />
        </Switch>
    )
    if(props.isAuthenticated){
        routes = (
            <Switch>
                <Route path="/stocks/:symbol" component={StockDetail}></Route>
                <Route path="/" exact component={Home}></Route>
                <Route path="/logout" component={Logout}></Route>
                <Route path="/auth" component={Auth}></Route>
                <Redirect to='/' />
            </Switch>
        )
    }
    return (
        <div>
            <Topbar drawerToggleClicked={sideDrawerHandler}></Topbar>
            <SideDrawer show={showSideDrawer} sideDrawerClicked={sideDrawerClose}></SideDrawer>
            {routes}
        </div>
    );
}


const mapStateToProps = state=>{
  return {
    isAuthenticated: state.auth.isLoggedIn
  }
}
export default connect(mapStateToProps)(App)
