import React, { Component } from 'react'
import { Form, Button, Label } from 'semantic-ui-react'
import '../index.css'

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
			action: 'Register'
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
		if(this.state.action == 'Register') {
			this.props.register(this.state)
		} else {
			this.props.login(this.state)
		}
	}

	render() {
		return (
			<div className='LoginRegisterForm'>
				<h2> {this.state.action} </h2>
				{
					this.state.action == "Login"
					?
					<p> Don't have an account? <span onClick={this.switchAction} className='fake-link'>Make one here :)</span></p>
					:
					<p> Already have an account? <span onClick={this.switchAction} className='fake-link'>Sign in here :)</span></p>
				}
				{
					this.state.action == 'Register'
					&&
					<div className="authDivRequired">
						<h3> required stuff </h3>
						<small> you will not be able to change these later, so choose wisely</small>
					</div>
				}
				<Form onSubmit={this.handleSubmit}>
					<Label> username* </Label>
					<Form.Input
						name='username'
						type='text'
						value={this.state.value}
						placeholder='username :)'
						onChange={this.handleChange}
						required
					/>
					{
						this.state.action == 'Register'
						&&
						<React.Fragment>
							<Label> email* </Label>
							<Form.Input 
								name='email'
								type='text'
								value={this.state.value}
								placeholder='email :)'
								onChange={this.handleChange}
								required
							/>
						</React.Fragment>
					}
					<Label> password* </Label>
					<Form.Input 
						name='password'
						type='password'
						value={this.state.value}
						placeholder='password :)'
						onChange={this.handleChange}
						required
					/>
					{
						this.state.action == 'Register'
						&&
						<React.Fragment>
							<Label> age* </Label>
							<Form.Input 
								name='age'
								type='number'
								value={this.state.value}
								placeholder='age :)'
								onChange={this.handleChange}
								required
							/>
						</React.Fragment>
					}
					{
						this.state.action == 'Register'
						&&
						<React.Fragment>
							<h3> fun stuff </h3>
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
			</div>
		)
	}
}