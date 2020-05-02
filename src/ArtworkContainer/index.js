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

			const url = process.env.REACT_APP_API_URL + '/artwork/' + id

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
		// set idOfUserToShow to ''
		// set mode to 'index'

			// maybe call switch mode ???
	}

	render(){
		console.log(this.state);
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
						currentUser={this.state.currentUser}
					/>
				}
			</>
		)
	}
}