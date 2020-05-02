import React, { Component } from 'react'
import UserList from '../UserList'
import UserShowPage from '../UserShowPage'

export default class UserContainer extends Component {
	constructor() {
		super()

		this.state ={
			users: [],
			mode: 'index',
			userToShowData: ''
		}
	}

	componentDidMount() {
		console.log('componentDidMount');
		this.getUsers()
	}

	switchMode = (id) => {
		console.log("SWITCH MODE in USER CONTAINER");

		console.log("id from switch mode", id);

		if(this.state.mode === 'index') {

			this.getUserToShowInfo(id)

			this.setState({
				mode: 'show'
			})
		} else {
			this.setState({
				mode: 'index',
				userToShowData: ''
			})
		}
	}

	getUserToShowInfo = async (id) => {
		console.log("ID FROM getUserToShowInfo",id);
		try {

			const url = process.env.REACT_APP_API_URL + '/users/' + id

			const showUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			console.log('showUserResponse', showUserResponse);

			const showUserJson = await showUserResponse.json()
			console.log('showUserJson', showUserJson);

			this.setState({
				userToShowData: showUserJson.data
			})
			
		} catch (error) {
			console.error(error)
		}
	}

	closeShowModal = () => {
		this.switchMode()
		// set idOfUserToShow to ''
		// set mode to 'index'

			// maybe call switch mode ???
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

	deleteUser = (deleteInfo) => {
		console.log('deleteUser');
	}

	updateUser = (updateInfo) => {
		console.log("update info from updateUser", updateInfo);
		this.closeShowModal()
		// find index of user that needs updating
		const users = this.state.users
		const indexOfUserBeingEdited = users.findIndex(user => user.id === updateInfo.data.id)
		console.log('indexOfUserBeingEdited', indexOfUserBeingEdited);
		console.log('users[indexOfUserBeingEdited]', users[indexOfUserBeingEdited]);
		users[indexOfUserBeingEdited] = updateInfo.data
		this.setState({
			users: users
		})
		// need to change this.state.users ????
	}

	render() {
		console.log("THIS.STATE from USER CONTAINER RENDER", this.state);
		return (
			<React.Fragment>
				<h3> UserContainer </h3>
				<UserList switchMode={this.switchMode} users={this.state.users}/>
				{
					this.state.mode === 'show'
					&&
					<UserShowPage 
						closeShowModal={this.closeShowModal} 
						userToShowData={this.state.userToShowData}
						currentUser={this.props.currentUser}
						updateUser={this.updateUser}
						deleteUser={this.deleteUser}
					/>
				}
			</React.Fragment>
		)
	}
}