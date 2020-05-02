import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import EditUserModal from '../EditUserModal'


export default class UserShowPage extends Component {
	constructor() {
		super()

		this.state ={

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
					<EditUserModal />
				}
			</Modal>
		)
	
	}
}