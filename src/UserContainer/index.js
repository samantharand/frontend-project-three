import React, { Component } from 'react'
import UserList from '../UserList'
import UserShowPage from '../UserShowPage'
import EditUserModal from '../EditUserModal'

export default class UserContainer extends Component {
	constructor() {
		super()

		this.state ={
			users: [],
			mode: 'index'
		}
	}

	componentDidMount() {
		console.log('componentDidMount');
		this.getUsers()
	}

	switchMode = (id) => {
		console.log("SWITCH MODE in USER CONTAINER");
		// console.log(event.currentTarget);
		console.log(id);

		if(this.state.mode === 'index') {
			this.setState({
				mode: 'show'
			})
		} else {
			this.setState({
				mode: 'index'
			})
		}
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
				<UserList switchMode={this.switchMode} users={this.state.users}/>
				{
					this.state.mode === 'show'
					&&
					<UserShowPage />
				}
				<EditUserModal />
			</React.Fragment>
		)
	}
}