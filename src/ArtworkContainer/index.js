import React, { Component } from 'react'
import ArtworkList from '../ArtworkList'
import NewArtworkForm from '../NewArtworkForm'

export default class ArtworkContainer extends Component {
	constructor() {
		super()
		this.state = {
			artwork: [],
			adding: false
		}
	}

	componentDidMount() {
		this.getArt()
		console.log('wassup');
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

	addArt = async (artToAdd) => {
		console.log(artToAdd);
		try {
			const url = process.env.REACT_APP_API_URL + '/artworks/add'
			const addArtResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(artToAdd),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const addArtJson = await addArtResponse.json()
			console.log(addArtJson);
			
		} catch (error) {
			console.error(error)
		}
	}

	closeAddModal = () => {
		this.setState({
			adding: false
		})
	}

	render(){
		console.log(this.state);
		return (
			<>
				<p> ArtworkContainer </p>
				{
					this.state.adding
					&&
					<NewArtworkForm addArt={this.addArt} adding={this.state.adding} closeAddModal={this.closeAddModal}/>
				}
				<ArtworkList artwork={this.state.artwork}/>
			</>
		)
	}
}