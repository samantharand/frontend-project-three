import React, { Component } from 'react';
import LoginRegisterForm from './LoginRegisterForm'
import ArtworkContainer from './ArtworkContainer'
import UserContainer from './UserContainer'
import Header from './Header'
import Home from './Home'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      message: '',
      mode: 'Home',
      currentUser: ''
    }
  }

  register = async (registerInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/users/register'
      console.log(url);
      console.log("pre - fetch");

        const registerResponse = await fetch(url, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(registerInfo),
          headers: {
            'Content-Type': 'application/json'
          } 
        })

      console.log("post - fetch");

      console.log(registerResponse);

      const registerJson = await registerResponse.json()

      console.log('REGISTERJSON', registerJson)

      if(registerJson.status == 401) {

        this.setState({
          message: registerJson.message
        })

      } else {

        this.setState({
          loggedIn: true,
          mode: 'Home',
          currentUser: registerJson.data
        })

      }

    } catch (error) {
      console.error(error)
    }
  }

  login = async (loginInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/users/login'

      const loginResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        } 
      })

      const loginJson = await loginResponse.json()
      console.log('LOGIN JSON', loginJson);
      if(loginJson.status === 201) {

        this.setState({
          loggedIn: true,
          mode: 'Home',
          currentUser: loginJson.data
        })

      } else {
        console.log('ughslkdfj???/');
        this.setState({
          message: loginJson.message
        })
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  logout = async () => {
    console.log('logout');
    try {
      
      const url = process.env.REACT_APP_API_URL + '/users/logout'

      const logoutResponse = await fetch(url, {
        include: 'credentials'
      })

      const logoutJson = await logoutResponse.json()
      console.log(logoutJson);
      if(logoutJson.status === 200) {
        this.setState({
          loggedIn: false,
          currentUser: ''
        })
      }

    } catch (error) {

      console.error(error)

    }
  }

  switchMode = (event) => {
    this.setState({
      mode: event.target.innerText
    })
  }

  render() {
    return (
      <div className="App">
        <Header 
          logout={this.logout} 
          loggedIn={this.state.loggedIn}
          switchMode={this.switchMode}
        />
        
        <React.Fragment>
          {
            this.state.mode === "Home"
            &&
            <Home />
          }
          {
            this.state.mode === "User"
            &&
            <UserContainer 
              currentUser={this.state.currentUser}
              logout={this.logout}
            />
          }
          {
            this.state.mode === "Artwork"
            &&
            <ArtworkContainer />
          }
          {
            this.state.mode === "Log In / Register"
            &&
            <LoginRegisterForm 
              message={this.state.message} 
              login={this.login} 
              register={this.register}
            />
          }
        </React.Fragment>

      </div>
    );
  }
}

