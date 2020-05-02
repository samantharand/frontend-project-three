import React, { Component } from 'react'
import { Form, Button, Label, Modal, Input } from 'semantic-ui-react'

export default class EditArtModal extends Component {
	constructor() {
		super()

		this.state ={
			// title: this.props.artworkToShowData.title,
			// image: this.props.artworkToShowData.image,
			// medium: this.props.artworkToShowData.medium,
			// inspiration: this.props.artworkToShowData.inspiration,
			// date_made: this.props.artworkToShowData.date_made
		}
	}

	componentDidMount() {
		console.log('THIS DOTTT PROPS IN EDIT ART MODEL',this.props);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = () => {
		this.props.addArt(this.state)
		this.hideModal()
	}

	render() {
		return (
			<Modal trigger={<Button>Edit Artwork</Button>}>
				<p>add daaaa art :)</p>
				<Form onSubmit={this.handleSubmit}>
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
					<Button type="submit">Submit Edits</Button>
				</Form>
			</Modal>

		)
	}
}