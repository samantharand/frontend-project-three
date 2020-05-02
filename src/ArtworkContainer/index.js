import React, { Component } from 'react'
import ArtworkShowPage from '../ArtworkShowPage'
import ArtworkList from '../ArtworkList'
import Header from '../Header'


export default class ArtworkContainer extends Component {
	constructor() {
		super()
		this.state = {
			artworks: [],
			mode: 'index',
			artworkToShowData: ''
		}
	}

	componentDidMount() {
		this.getArtworks()
	}

	switchMode = (id) => {
		console.log("switch mode called!!! from art container");
		if(this.state.mode === 'index'){

			this.getArtworkToShowInfo(id)

			this.setState({
				mode: 'show'
			})
		} else {
			this.setState({
				mode: 'index',
				artworkToShowData: ''
			})
		}
	}

	getArtworkToShowInfo = async (id) => {
		console.log("ID FROM getArtworkToShowInfo",id);
		try {

			const url = process.env.REACT_APP_API_URL + '/artworks/' + id

			const showArtworkResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			console.log('showArtworkResponse', showArtworkResponse);

			const showArtworkJson = await showArtworkResponse.json()
			console.log('showArtworkJson', showArtworkJson);

			this.setState({
				artworkToShowData: showArtworkJson.data
			})
			
		} catch (error) {
			console.error(error)
		}
	}

	getArtworks = async () => {
		try {
			
			const url = process.env.REACT_APP_API_URL + '/artworks/all'

			const artworksResponse = await fetch(url, {
				credentials: 'include'
			})
			console.log('artworksResponse', artworksResponse);
			const artworksJson = await artworksResponse.json()
			console.log('artworksJson', artworksJson);

			this.setState({
				artworks: artworksJson.data
			})

		} catch (error) {
			console.error(error)
		}
	}

	// showArt = () => {
	// 	// MAKE SHOW PAGES FOR ARTWORKS - reference user show/container
	// }

	closeShowModal = () => {
		console.log('this.closeShowModal called');
		this.switchMode()
	}

	deleteArtwork = async (deleteInfo) => {
		console.log('deleteArtwork');
		console.log('deleteInfo', deleteInfo.id);
		const url = process.env.REACT_APP_API_URL + '/artworks/' + deleteInfo.id
		console.log(url);
		try {
			const deleteArtworkResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})

			const deleteArtworkJson = await deleteArtworkResponse.json()
			console.log(deleteArtworkJson);
			
			// ALSO NEED TO FETCH ALL ART AND DELETE IT WHERE ARTIST ID == USER ID

			if(deleteArtworkJson.status === 201) {
				this.setState({
					artworks: this.state.artworks.filter(artwork => artwork.id !== deleteArtworkJson.id) 
				})
				this.closeShowModal()
				this.getArtworks()
			}
			console.log('mode called from deleteArtwork',this.state.mode);

		} catch (error) {

			console.error(error)

		}
	}

	updateArtwork = (updateInfo) => {
		console.log("update info from updateArtwork", updateInfo);
		console.log("update info data from updateArtwork", updateInfo.data);
		this.closeShowModal()
		// find index of user that needs updating
		const artworks = this.state.artworks
		const indexOfArtworkBeingEdited = artworks.findIndex(artwork => artwork.id === updateInfo.data.id)
		console.log('pre-reassign artworks[indexOfArtworkBeingEdited]', artworks[indexOfArtworkBeingEdited]);
		artworks[indexOfArtworkBeingEdited] = updateInfo.data
		console.log('artworks[indexOfArtworkBeingEdited]', artworks[indexOfArtworkBeingEdited]);
		this.setState({
			artworks: artworks
		})
		// need to change this.state.users ????
	}

	render(){
		console.log('this.state from artwork container', this.state);
		console.log('artworkToShowData', this.state.artworkToShowData);
		return (
			<>
				<ArtworkList switchMode={this.switchMode} artworks={this.state.artworks}/>
				{
					this.state.mode === 'show'
					&&
					<ArtworkShowPage 
						closeShowModal={this.closeShowModal}
						artworkToShowData={this.state.artworkToShowData}
						currentUser={this.props.currentUser}
						updateArtwork={this.updateArtwork}
						deleteArtwork={this.deleteArtwork}
					/>
				}
			</>
		)
	}
}