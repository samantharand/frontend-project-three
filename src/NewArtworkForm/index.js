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

	selctedFileHandler = async (event) => {
	    const files = event.target.files
	    const data = new FormData()
	    const url = 'https://api.cloudinary.com/v1_1/samantharand/image/upload'
	    data.append('file', files[0])
	    data.append('upload_preset', 'quart-app')

	    const uploadImageResponse = await fetch(url, {
	      method: 'POST',
	      body: data
	    })

	    const file = await uploadImageResponse.json()


	    this.setState({
	    	image: file.secure_url
	    })
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

	hideModal = () => {
		this.setState({
			showModal: false
		})
	}

	render() {
		return (
			<div className='ModalForm'>
				<h3>Add Some Artwork</h3>
				<Form onSubmit={this.handleSubmit}>
					<Form.Field>
						<Label>Title*</Label>
						<Input 
							focus
							name='title'
							type='text'
							placeholder='Title'
							value={this.state.title}
							onChange={this.handleChange}
							required
						/>
					</Form.Field>
					<Form.Field>
						<Label>Image*</Label>
						<Input 
							focus
							name='image'
							type='file'
							onChange={this.selctedFileHandler}
							required
						/>
					</Form.Field>
					<Form.Field>
						<Label>Medium*</Label>
						<Input 
							focus
							name='medium'
							type='text'
							placeholder='Medium'
							value={this.state.medium}
							onChange={this.handleChange}
							required
						/>
					</Form.Field>
					<Label> Inspiration</Label>
					<Form.TextArea 
						type='text' 
						name='inspiration' 
						placeholder='What inspired this?!' 
						value={this.state.value}
						onChange={this.handleChange}
					/>
					<Form.Field>
						<Label>Date Made*</Label>
						<Input 
							focus
							name='date_made'
							type='date'
							value={this.state.date_made}
							onChange={this.handleChange}
							required
						/>
					</Form.Field>
					<Button type="submit">Add Art</Button>
				</Form>
			</div>

		)
	}

}