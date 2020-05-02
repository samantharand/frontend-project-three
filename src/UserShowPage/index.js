import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'


export default class UserShowPage extends Component {
	constructor() {
		super()

		this.state ={
			
		}
	}

	render() {
		return (
			<Modal closeIcon onClose={this.props.closeShowModal} open={true}>
				<h3>{this.props.userToShowData.username}</h3>
			</Modal>
		)
	
	}
}