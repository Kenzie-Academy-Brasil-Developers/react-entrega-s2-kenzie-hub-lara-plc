import { Switch,Route } from "react-router-dom"
import { useState, useEffect } from "react";
import Login from '../pages/login';
import SignUp from '../pages/signup'
import Dashboard from '../pages/dashboard'

const Routes = () => {



    const[isLogged, setIsLogged] = useState(false);
    const[error, setError] = useState(false);
  
    useEffect(() => {
      const token = JSON.parse(localStorage.getItem("@KenzieHub:token"));
  
      if(token){
        return setIsLogged(true);
      }
    }, [isLogged])





    return(
      <Switch>
        
      <Route exact path='/'>
            <Login
            isLogged = {isLogged}
            setIsLogged = {setIsLogged}
            setError={setError}
            />
      </Route>


      <Route exact path='/signup'>
          <SignUp
          isLogged = {isLogged}
          />
      </Route>


      <Route exact path='/dashboard'>
        <Dashboard
        isLogged = {isLogged}
        setIsLogged = {setIsLogged}
        />
      </Route>



      </Switch>
    )
}

export default Routes