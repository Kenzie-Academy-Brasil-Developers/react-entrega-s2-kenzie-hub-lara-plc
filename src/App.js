import {Switch, Route} from 'react-router-dom'
import {Container} from '@mui/material'
import './App.css';
import Login from './components/login';
import { useEffect, useState } from 'react';
import SignUp from './components/signup';
import Dashboard from './components/dashboard';




function App() {

  const[isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('@KenzieHub:token'));

    if(token){
      return setIsLogged(true);
    }
  }, [isLogged])


  return (
    <Container>


      <Switch>
        
      <Route exact path={'/'}>
            <Login
            isLogged = {isLogged}
            setIsLogged = {setIsLogged}
            />
      </Route>


      <Route exact path={'/signup'}>
          <SignUp
          isLogged = {isLogged}
          />
      </Route>


      <Route exact path={'/dashboard'}>
        <Dashboard
        isLogged = {isLogged}
        setIsLogged = {setIsLogged}
        />
      </Route>



      </Switch>

    </Container>
  )
}

export default App;
