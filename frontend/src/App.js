import './App.css';
import React from 'react';
import {useSelector} from 'react-redux'
import Home from './components/Loginpage/Home';
import CutomerCreate from './components/Forms/CutomerCreate';
import OrderCreate from './components/Forms/OrderCreate';
import HomeAdmin from './components/AdminPage/HomeAdmin';
import ProtectedRoute from "./components/protectedRoute/protectedRoute"
import Home2 from './components/detailsPage/Home2';
import store from "./store";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import ClientCreate from './components/Forms/ClientCreate';
import { loadUser } from './actions/clientAction';
import { useEffect } from 'react';
import OrderDetails from './components/detailsPage/OrderDetails';
import updatePassword from './components/Forms/updatePassword';
// import redirect from './components/AdminUserRedirect/redirect';
function App() {

  const {loading, isAuthenticated, client} = useSelector(state => state.client)

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <>
      <Router>
        <Switch>

        
          <Route exact path='/' component={Home} />
          {/* <ProtectedRoute exact path="/customer" component={Home2} /> */}
          {/* <ProtectedRoute exact path="/redirect" component={redirect} /> */}
          {/* <ProtectedRoute exact path="/customer/new" component={CutomerCreate} /> */}

          {
            <Route exact path="/customer" component={(loading === false && isAuthenticated ===true) ? Home2 : Home}/>
          }

{
            <Route path="/customer/:keyword" component={(loading === false && isAuthenticated ===true) ? Home2 : Home}/>
          }
{
            <Route path="/admin/password/updatepassword" component={ client && (loading === false && client.role === "admin") ? updatePassword : Home}/>
          }
          

{
            <Route exact path="/admin" component={ client && (loading === false && client.role === "admin") ? HomeAdmin : Home}/>
          }


{
            <Route path="/admin/:keyword" component={ client && (loading === false && client.role === "admin") ? HomeAdmin : Home}/>
          } 
          

          {
            <Route exact path="/order/:id" component={(loading === false && isAuthenticated ===true) ? OrderDetails : Home}/>
          }


          <Route path="/customers/new" component={CutomerCreate}/>
          <ProtectedRoute exact path="/clients/register" component={ClientCreate} />
          {/* <ProtectedRoute exact path="/admin" component={HomeAdmin} /> */}
          {/* <ProtectedRoute exact path="/admin/:keyword" component={HomeAdmin} /> */}
          <ProtectedRoute exact path="/customers/orders/new/:id" component={OrderCreate} />
          </Switch>
      </Router>
    </>
  );
}
export default App;
