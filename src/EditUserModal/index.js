import React, { Component } from 'react'
import { Modal, Form, Button, Label } from 'semantic-ui-react'

export default class EditUserModal extends Component {
	constructor() {
		super()

		this.state = {
			username: '',
			email: '',
			password: '',
			age: '',
			location: '',
			bio: '',
			message: ''
		}
	}

	componentDidMount() {
		// need to get the current user so we can populate the stuff
		// this iwll be on the users show page, so maybe easier to do ?? 
		// took break fromthis at 704 to make user show page!!
	}

	render() {
		return (
			<Modal trigger={<Button>edit</Button>} className='EditUserModal' closeIcon>
				<h2> Edit Your Account </h2>
				<p> {this.state.message} </p>
				<Form onSubmit={this.handleSubmit}>
					<Label> username </Label>
					<Form.Input 
						name='username'
						type='text'
						value={this.state.value}
						placeholder='username :)'
						onChange={this.handleChange}
					/>			
					<Label> email </Label>
					<Form.Input 
						name='email'
						type='text'
						value={this.state.value}
						placeholder='email :)'
						onChange={this.handleChange}
					/>
					<Label> password </Label>
					<Form.Input 
						name='password'
						type='password'
						value={this.state.value}
						placeholder='password :)'
						onChange={this.handleChange}
					/>
				

					<h3> fun stuff </h3>
					<Label> age </Label>
					<Form.Input 
						name='age'
						type='number'
						value={this.state.value}
						placeholder='age :)'
						onChange={this.handleChange}
					/>
					<Label> location </Label>
					<Form.Input 
						name='location'
						type='text'
						value={this.state.value}
						placeholder='location :)'
						onChange={this.handleChange}
					/>
					<Label> bio </Label>
					<Form.TextArea 
						name='bio'
						type='text'
						value={this.state.value}
						placeholder='bio :)'
						onChange={this.handleChange}
					/>
					<Button type='submit'> {this.state.action} </Button>
				</Form>
			</Modal>
		)
	}
}