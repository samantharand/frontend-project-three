import React, { Component } from 'react'
import { Modal, Form, Button, Label } from 'semantic-ui-react'

export default class EditUserModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: this.props.currentUser.username,
			email: this.props.currentUser.email,
			age: this.props.currentUser.age,
			location: this.props.currentUser.location,
			bio: this.props.currentUser.bio,
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
		return (
			<Modal trigger={<Button>edit</Button>} className='EditUserModal' closeIcon>
				<h2> Edit Your Account </h2>
				<Form onSubmit={this.handleSubmit}>
					<Label> username </Label>
					<Form.Input 
						name='username'
						type='text'
						value={this.state.username}
						placeholder='username :)'
						onChange={this.handleChange}
					/>			
					<Label> email </Label>
					<Form.Input 
						name='email'
						type='text'
						value={this.state.email}
						placeholder='email :)'
						onChange={this.handleChange}
					/>

					<h3> fun stuff </h3>
					<Label> age </Label>
					<Form.Input 
						name='age'
						type='number'
						value={this.state.age}
						placeholder='age :)'
						onChange={this.handleChange}
					/>
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