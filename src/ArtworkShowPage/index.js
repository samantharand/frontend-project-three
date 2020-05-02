import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'


export default class ArtworkShowPage extends Component {
	constructor() {
		super()
		this.state = {

		}
	}
	render() {
		console.log(this.props);
		return (
			<Modal>
				<h3>{this.props.artworkToShowData.title}</h3>
			</Modal>
		)
	}
}
