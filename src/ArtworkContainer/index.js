import React, { Component } from 'react'
import ArtworkShowPage from '../ArtworkShowPage'
import ArtworkList from '../ArtworkList'
import Header from '../Header'


export default class ArtworkContainer extends Component {
	constructor() {
		super()
		this.state = {
			artwork: [],
			mode: 'index',
			artworkToShowData: ''
		}
	}

	componentDidMount() {
		this.getArt()
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

	getArt = async () => {
		try {
			
			const url = process.env.REACT_APP_API_URL + '/artworks/all'

			const artworksResponse = await fetch(url, {
				credentials: 'include'
			})
			console.log('artworksResponse', artworksResponse);
			const artworksJson = await artworksResponse.json()
			console.log('artworksJson', artworksJson);

			this.setState({
				artwork: artworksJson.data
			})

		} catch (error) {
			console.error(error)
		}
	}

	// showArt = () => {
	// 	// MAKE SHOW PAGES FOR ARTWORKS - reference user show/container
	// }

	closeShowModal = () => {
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

			if(deleteArtworkJson.status === 200) {
				this.setState({
					artworks: this.state.artworks.filter(user => user.id !== deleteArtworkJson.id) 
				})
				this.props.logout()
				this.closeShowModal()
				this.getArtworks()
			}

		} catch (error) {

			console.error(error)

		}
	}

	updateArtwork = (updateInfo) => {
		console.log("update info from updateArtwork", updateInfo);
		this.closeShowModal()
		// find index of user that needs updating
		const artworks = this.state.artworks
		const indexOfArtworkBeingEdited = artworks.findIndex(artwork => artwork.id === updateInfo.data.id)
		artworks[indexOfArtworkBeingEdited] = updateInfo.data
		
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
				<p> ArtworkContainer </p>
				<ArtworkList switchMode={this.switchMode} artwork={this.state.artwork}/>
				{
					this.state.mode === 'show'
					&&
					<ArtworkShowPage 
						closeShowModal={this.closeShowModal}
						artworkToShowData={this.state.artworkToShowData}
						currentUser={this.props.currentUser}
						updateArtwork={this.state.updateArtwork}
						deleteArtwork={this.state.deleteArtwork}
					/>
				}
			</>
		)
	}
}