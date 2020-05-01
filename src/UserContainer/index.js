import React, { Component } from 'react'
import UserList from '../UserList'

export default class UserContainer extends Component {
	constructor() {
		super()

		this.state ={
			users: []
		}
	}

	componentDidMount() {
		console.log('componentDidMount');
		this.getUsers()
	}

	getUsers = async () => {
		try {
	
			const url = process.env.REACT_APP_API_URL + '/users/all'

			const usersResponse = await fetch(url, {
				credentials: 'include'
			})

			const usersJson = await usersResponse.json()
			console.log('USER JSONNNN', usersJson);

			if(usersJson.status === 200) {
				this.setState({
					users: usersJson.data
				})
			}

		} catch (error) {

			console.error(error)
	 
	 	}
	}

	render() {
		return (
			<React.Fragment>
				<p> UserContainer </p>
				<UserList users={this.state.users}/>
			</React.Fragment>
		)
	}
}