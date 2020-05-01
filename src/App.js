import React, { Component } from 'react';
import LoginRegisterForm from './LoginRegisterForm'
import ArtworkContainer from './ArtworkContainer'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      message: ''
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
          loggedIn: true
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

      if(loginJson.staus === 201) {
        this.setState({
          loggedIn: true
        })
      } else {
        this.setState({
          message: loginJson.message
        })
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="App">
        {
          !this.state.loggedIn
          &&
          <LoginRegisterForm 
            message={this.state.message} 
            login={this.login} 
            register={this.register}
          />
        }
        <ArtworkContainer />
      </div>
    );
  }
}

