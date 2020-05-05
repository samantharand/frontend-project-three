import React, { Component } from 'react'
import { Modal, Form, Button, Label } from 'semantic-ui-react'

export default class EditUserModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: this.props.userToShowData.username,
			email: this.props.userToShowData.email,
			age: this.props.userToShowData.age,
			location: this.props.userToShowData.location,
			bio: this.props.userToShowData.bio,
			message: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.editUser(this.state)

	}

	render() {
		return (
			<Modal trigger={<Button>Edit</Button>} className='EditUserModal' closeIcon>
				<h2> Edit Your Account </h2>
				<Form onSubmit={this.handleSubmit}>
					<Label> Location </Label>
					<Form.Input 
						name='location'
						type='text'
						value={this.state.location}
						placeholder='Location'
						onChange={this.handleChange}
					/>
					<Label> Bio </Label>
					<Form.TextArea 
						name='bio'
						type='text'
						value={this.state.bio}
						placeholder='Tell us about yourself!'
						onChange={this.handleChange}
					/>
					<Button type='submit'> Submit Edits </Button>
				</Form>
			</Modal>
		)
	}
}