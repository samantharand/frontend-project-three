import React, { Component } from 'react'
import UserList from '../UserList'
import UserShowPage from '../UserShowPage'
import '../index.css'

export default class UserContainer extends Component {
	constructor() {
		super()

		this.state ={
			users: [],
			allArtworksByUsers: [],
			mode: 'index',
			userToShowData: '',
			userToShowArtworks: ''
		}
	}

	componentDidMount() {
		// console.log('componentDidMount');
		this.getUsers()
		// try to get usertoshowartworks here !! -- makes it so data is preloaded when we click the user show page
	}

	switchMode = (id) => {
		// console.log("SWITCH MODE in USER CONTAINER");

		// console.log("id from switch mode", id);

		if(this.state.mode === 'index') {

			this.getUserToShowInfo(id)

			this.setState({
				mode: 'show'
			})
		} else {
			this.setState({
				mode: 'index',
				userToShowData: '',
				userToShowArtworks: ''
			})
		}
	}

	getUserToShowInfo = async (id) => {
		// console.log("ID FROM getUserToShowInfo",id);
		try {

			const url = process.env.REACT_APP_API_URL + '/users/' + id

			const showUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			// console.log('showUserResponse', showUserResponse);

			const showUserJson = await showUserResponse.json()
			// console.log('showUserJson !!!!!!!!!', showUserJson);


			// find index of user
			const users = await this.state.users
			// console.log('users variable', users);
			// console.log(typeof(id));						// number
			// console.log(typeof(this.state.users[9].id));// number
			const index = await users.findIndex(user => user.id === id)
			// console.log('INDEXXXXXX', index);
			// console.log('id', id);
			// console.log('this.state.users[index].id', this.state.users[index].id);
			// get the artwork of that user from the state
			await this.setState({
				userToShowData: showUserJson.data,
				userToShowArtworks: this.state.allArtworksByUsers[index]
			})
			
		} catch (error) {
			console.error(error)
		}
	}

	getAllArtworkByUsers = async (id) => {
		try {

			const url = process.env.REACT_APP_API_URL + '/users/' + id

			const showUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			// console.log('showUserResponse', showUserResponse);

			const showUserJson = await showUserResponse.json()
			// console.log('showUserJson !!!!!!!!!', showUserJson);
			let allArtworksByUsers = await this.state.allArtworksByUsers
			await allArtworksByUsers.push(showUserJson.artworks)
			await this.setState({
				allArtworksByUsers: allArtworksByUsers
			})
			
		} catch (error) {
			console.error(error)
		}
	}

	closeShowModal = () => {
		this.switchMode()
	}

	getUsers = async () => {
		try {
			// console.log('GET USERS CALED !!!!!!!');
			const url = process.env.REACT_APP_API_URL + '/users/all'

			const usersResponse = await fetch(url, {
				credentials: 'include'
			})

			const usersJson = await usersResponse.json()
			// console.log('USER JSONNNN', usersJson);
			// console.log('USER JSONNNN[9]', usersJson.data[9]);

			if(usersJson.status === 200) {
				this.setState({
					users: usersJson.data
				})
			}

			for(let i = 0; i < this.state.users.length; i++){
				await this.getAllArtworkByUsers(this.state.users[i].id)
			}

		} catch (error) {

			console.error(error)
	 
	 	}
	}

	deleteUser = async (deleteInfo) => {
		// console.log('deleteUser');
		// console.log('deleteInfo', deleteInfo.id);
		const url = process.env.REACT_APP_API_URL + '/users/' + deleteInfo.id
		// console.log(url);
		try {
			
			const deleteUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})

			const deleteUserJson = await deleteUserResponse.json()
			// console.log(deleteUserJson);
			
			// ALSO NEED TO FETCH ALL ART AND DELETE IT WHERE ARTIST ID == USER ID

			if(deleteUserJson.status === 200) {
				this.setState({
					users: this.state.users.filter(user => user.id !== deleteUserJson.id) 
				})
				this.props.logout()
				this.closeShowModal()
				this.getUsers()
			}

		} catch (error) {

			console.error(error)

		}
	}

	updateUser = (updateInfo) => {
		// console.log("update info from updateUser", updateInfo);
		this.closeShowModal()
		// find index of user that needs updating
		const users = this.state.users
		const indexOfUserBeingEdited = users.findIndex(user => user.id === updateInfo.data.id)
		// console.log('indexOfUserBeingEdited', indexOfUserBeingEdited);
		// console.log('users[indexOfUserBeingEdited]', users[indexOfUserBeingEdited]);
		users[indexOfUserBeingEdited] = updateInfo.data
		// console.log("THIS SHOULD BE UPDATED NOW");
		// console.log(this.state.users);
		// console.log("");
		this.setState({
			users: users
		})
		// need to change this.state.users ????
	}

	render() {
		// console.log("THIS.STATE from USER CONTAINER RENDER", this.state);
		return (
			<React.Fragment>
				<h3> The Artists </h3>
				<UserList switchMode={this.switchMode} users={this.state.users}/>
				{
					this.state.mode === 'show'
					&&
					<UserShowPage 
						closeShowModal={this.closeShowModal} 
						userToShowData={this.state.userToShowData}
						userToShowArtworks={this.state.userToShowArtworks}
						currentUser={this.props.currentUser}
						updateUser={this.updateUser}
						deleteUser={this.deleteUser}
					/>
				}
			</React.Fragment>
		)
	}
}