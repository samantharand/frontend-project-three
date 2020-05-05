import React, { Component } from 'react'
// import Moment from 'react-moment'		// brand new update broke this :(
// import 'moment-timezone'				// https://github.com/moment/moment/issues/4216
import { Modal, Button } from 'semantic-ui-react'
import EditArtModal from '../EditArtworkModal'
import moment from 'moment'
import '../index.css'


export default class ArtworkShowPage extends Component {
	constructor() {
		super()
		this.state = {
		
		}
	}

	componentDidMount() {
		// console.log('THIS.PROPS in ArtworkShowPage',this.props);
		// console.log('this.props.currentUser', this.props.currentUser);
		// console.log('this.props.artworkToShowData.artist', this.props.artworkToShowData.artist);
	}

	editArtwork = async (editInfo) => {
		// console.log("EDIT INFO", editInfo);
		// console.log('ARTWORK TO SHOW DATA', this.props.artworkToShowData);
		try {

			const url = process.env.REACT_APP_API_URL + '/artworks/' + this.props.artworkToShowData.id
			console.log('URL from EDIT ARTWORK', url);
			const editArtworkResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(editInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const editArtworkJson = await editArtworkResponse.json()
			console.log('editArtworkJson',editArtworkJson);

			if(editArtworkJson.status === 201) {
				this.props.updateArtwork(editArtworkJson)
			}
	
		} catch (error) {

			console.error(error)

		}
	}

	render() {
		const dateMade = new Date(this.props.artworkToShowData.date_made)

		return (
			<>
				{
					this.props.artworkToShowData.artist !== undefined
					&&
					<Modal open={true} closeIcon onClose={this.props.closeShowModal}>
						<div className='insideModalInfo'>
							<h3>{this.props.artworkToShowData.title}</h3>
							<p><small><strong>By:</strong> {this.props.artworkToShowData.artist.username}</small></p>
							<p><strong>Medium:</strong> {this.props.artworkToShowData.medium}</p>
							<p><strong>Inspiration:</strong> {this.props.artworkToShowData.inspiration}</p>
							{
								this.props.artworkToShowData.date_made
								&&
								<p><strong>Date Made:</strong> {dateMade.toLocaleDateString()}</p>
							}
							<div className="artInShowPage">
								<img width='100%' src={this.props.artworkToShowData.image} />
							</div>
							<div className="authControls">
							{
								this.props.currentUser.id === this.props.artworkToShowData.artist.id
								&&
								<React.Fragment>
									<EditArtModal 
										artworkToShowData={this.props.artworkToShowData}
										editArtwork={this.editArtwork}
									/>
									<Button 
										onClick={() => this.props.deleteArtwork(this.props.artworkToShowData)}
										color='red'
									>
										Delete Artwork
									</Button>
								</React.Fragment>
							}
							</div>
						</div>
					</Modal>
				}	
			</>
		)
	}
}
