import React, { Component } from 'react'
import ArtworkList from '../ArtworkList'

export default class ArtworkContainer extends Component {
	constructor() {
		super()
		this.state = {
			artwork: []
		}
	}

	componentDidMount() {
		this.getArt()
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

	render(){
		console.log(this.state);
		return (
			<>
				<p> ArtworkContainer </p>
				<ArtworkList />
			</>
		)
	}
}