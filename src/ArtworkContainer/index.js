import React, { Component } from 'react'

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
		const url = process.env.REACT_APP_API_URL + '/artworks/'

		const artworksResponse = await fetch(url, {
			credentials: 'include'
		})
		console.log('artworksResponse', artworksResponse);
		const artworksJson = await artworksResponse.json()
		console.log('artworksJson', artworksJson);
	}

	render(){
		return (
			<p> ArtworkContainer </p>
		)
	}
}