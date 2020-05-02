import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'


export default class ArtworkShowPage extends Component {
	constructor() {
		super()
		this.state = {
		
		}
	}

	componentDidMount() {
		console.log('THIS.PROPS in ArtworkShowPage',this.props);
		console.log('this.props.currentUser', this.props.currentUser);
		console.log('this.props.artworkToShowData.artist', this.props.artworkToShowData.artist);
	}

	editArtwork = async (editInfo) => {
		console.log('edit artwork called');
	}

	render() {
		return (
			<>
				{
					this.props.artworkToShowData.artist !== undefined
					&&
					<Modal open={true} closeIcon onClose={this.props.closeShowModal}>
						<h3>{this.props.artworkToShowData.artist.id}</h3>
					</Modal>
				}	
			</>
		)
	}
}

				// {
				// 	this.props.currentUser.id === this.props.artworkToShowData.artist.id
				// 	&&
				// 	<p>oh hell ya dis ur painting nice work bitch</p>
				// }