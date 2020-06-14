import React from 'react';
import Login from './pages/Login';
import Register from './pages/register';
import Home from './pages/home';
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
function App() {
  return (
    <div className="App">    
      

      <Router> 
        <Switch>  
          <Route path='/home' component={Home}/>
          <Route exact path={"/"} component={Home}/>
        </Switch>
        <Switch>  
          <Route path='/login' component={Login}/>
        </Switch>
        <Switch>  
          <Route path='/register' component={Register}/>
        </Switch>
        <CookiesProvider>
          <Switch>
            <Route path='/chat' component={Home}/>
          </Switch>
        </CookiesProvider>
      </Router>
    </div>
  );
}

export default App;
