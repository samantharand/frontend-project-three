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
			action: 'Login'
		}
	}

				//<p> {this.props.message} </p>
	render() {
		return (
			<Modal className='EditUserModal' open={true}>
				<h2> Edit Your Account </h2>
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