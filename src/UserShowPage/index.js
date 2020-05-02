import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import EditUserModal from '../EditUserModal'


export default class UserShowPage extends Component {
	constructor() {
		super()

		this.state ={

		}
	}

	editUser = async (editInfo) => {
		console.log('edit info from edit user in user show', editInfo);
		try {
			
			console.log('editinfo from edit user in UserShowPage', editInfo);
			const url = process.env.REACT_APP_API_URL + '/users/' + this.props.currentUser.id

			const editUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(editInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const editUserJson = await editUserResponse.json()
			console.log("Edit User Json", editUserJson);

			this.props.closeShowModal()
		} catch (error) {
			console.error(error)
		}

	}

	render() {
		console.log("CURRENT USER from UserShowPage", this.props.currentUser);
		console.log("this.props.userToShowData", this.props.userToShowData);
		return (
			<Modal closeIcon onClose={this.props.closeShowModal} open={true}>
				<h3>{this.props.userToShowData.username}</h3>
				{
					this.props.currentUser.id === this.props.userToShowData.id
					&&
					<EditUserModal 
						currentUser={this.props.currentUser} 
						editUser={this.editUser}
					/>
				}
			</Modal>
		)
	
	}
}