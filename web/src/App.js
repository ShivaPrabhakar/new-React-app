import React from 'react';
import Login from './pages/Login';
import Register from './pages/register';
import Home from './pages/home';
import ButtonAppBar from './components/appBar';
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';
function App() {
  return (
    <div className="App">    
      <ButtonAppBar/>   
      <Router> 
        <Switch>  
          <Route path='/home' component={Home}/>
        </Switch>
        <Switch>  
          <Route path='/login' component={Login}/>
        </Switch>
        <Switch>  
          <Route path='/register' component={Register}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
