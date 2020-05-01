import React, { Component } from 'react'
import { Form, Button, Label, Modal, Input } from 'semantic-ui-react'

export default class NewArtworkForm extends Component {
	constructor() {
		super()

		this.state ={
			title: '',
			image: '',
			medium: '',
			inspiration: '',
			date_made: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render() {
		return (
			<Modal trigger={<Button>add</Button>}>
				<p>add daaaa art :)</p>
				<Modal.Content>
					<Form>
						<Form.Field>
							<Label>Title</Label>
							<Input 
								focus
								name='title'
								type='text'
								placeholder='Title'
								value={this.state.title}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Image</Label>
							<Input 
								focus
								name='image'
								type='text'
								placeholder='Image'
								value={this.state.image}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Medium</Label>
							<Input 
								focus
								name='medium'
								type='text'
								placeholder='Medium'
								value={this.state.medium}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Label> Inspiration </Label>
						<Form.Field 
							control='textarea' 
							rows='3' 
							placeholder='What inspired this?!' 
							value={this.state.value}
						/>
						<Form.Field>
							<Label>Date Made</Label>
							<Input 
								focus
								name='date_made'
								type='date'
								value={this.state.date_made}
								onChange={this.handleChange}
							/>
						</Form.Field>
					</Form>
				</Modal.Content>

			</Modal>

		)
	}

}