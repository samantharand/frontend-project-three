import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import EditArtModal from '../EditArtworkModal'


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
						<h3>{this.props.artworkToShowData.title}</h3>
						<p>{this.props.artworkToShowData.inspiration}</p>
						{
							this.props.currentUser.id === this.props.artworkToShowData.artist.id
							&&
							<React.Fragment>
								<EditArtModal 
									artworkToShowData={this.props.artworkToShowData}
									editArtwork={this.editArtwork}
								/>
								<Button 
									onClick={() => this.props.deleteArtwork(this.props.artworkToShowData)}>
									Delete Artwork
								</Button>
							</React.Fragment>
						}
					</Modal>
				}	
			</>
		)
	}
}
