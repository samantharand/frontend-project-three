import React, { Component } from 'react'
import { Form, Button, Label } from 'semantic-ui-react'

export default class LoginRegisterForm extends Component {
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

	switchAction = () => {
		if(this.state.action == "Login")  {
			this.setState({
				action: 'Register'
			})
		} else {
			this.setState({
				action: 'Login'
			})
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		console.log("wassup its handle submit gettin called");
		console.log(this.state);
	}

	render() {
		return (
			<div className='LoginRegisterForm'>
				<h2> {this.state.action} </h2>
				<Form onSubmit={this.handleSubmit}>
					<Label> username </Label>
					<Form.Input 
						name='username'
						type='text'
						value={this.state.value}
						placeholder='username :)'
						onChange={this.handleChange}
					/>
					{
						this.state.action == 'Register'
						&&
						<React.Fragment>
							<Label> email </Label>
							<Form.Input 
								name='email'
								type='text'
								value={this.state.value}
								placeholder='email :)'
								onChange={this.handleChange}
							/>
						</React.Fragment>
					}
					<Label> password </Label>
					<Form.Input 
						name='password'
						type='password'
						value={this.state.value}
						placeholder='password :)'
						onChange={this.handleChange}
					/>
					{
						this.state.action == 'Register'
						&&
						<React.Fragment>
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
						</React.Fragment>
					}
					<Button type='submit'> {this.state.action} </Button>
				</Form>
				{
					this.state.action == "Login"
					?
					<p> Don't have an account? <span onClick={this.switchAction} className='fake-link'>Make one here :)</span></p>
					:
					<p> Already have an account? <span onClick={this.switchAction} className='fake-link'>Sign in here :)</span></p>
				}
			</div>
		)
	}
}