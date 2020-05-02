import React, { Component } from 'react'
import UserList from '../UserList'
import EditUserModal from '../EditUserModal'

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
				<h3> UserContainer </h3>
				<UserList users={this.state.users}/>
				<EditUserModal />
			</React.Fragment>
		)
	}
}