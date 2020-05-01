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
							/>
						</Form.Field>
						<Label> Inspiration </Label>
						<Form.TextArea value={this.state.inspiration} placeholder='What inspired this?!'/>
						<Form.Field>
							<Label>Date Made</Label>
							<Input 
								focus
								name='date_made'
								type='date'
								value={this.state.date_made}
							/>
						</Form.Field>
					</Form>
				</Modal.Content>

			</Modal>

		)
	}

}