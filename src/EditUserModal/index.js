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

	componentDidMount() {
		// need to get the current user so we can populate the stuff
		// this iwll be on the users show page, so maybe easier to do ?? 
		// took break fromthis at 704 to make user show page!!
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		console.log("Handle Submit do be getting called tho");
		console.log(this.state);
		console.log('edit user being called RIGHT under this');
		this.props.editUser(this.state)

	}
				// <p> {this.state.message} </p>

	render() {
		console.log("THIS DOT PROPSSSS in edit user", this.props);
		console.log("this.state", this.state);
		return (
			<Modal trigger={<Button>edit</Button>} className='EditUserModal' closeIcon>
				<h2> Edit Your Account </h2>
				<Form onSubmit={this.handleSubmit}>
					<Label> location </Label>
					<Form.Input 
						name='location'
						type='text'
						value={this.state.location}
						placeholder='location :)'
						onChange={this.handleChange}
					/>
					<Label> bio </Label>
					<Form.TextArea 
						name='bio'
						type='text'
						value={this.state.bio}
						placeholder='bio :)'
						onChange={this.handleChange}
					/>
					<Button type='submit'> Submit Edits </Button>
				</Form>
			</Modal>
		)
	}
}