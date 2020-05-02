import React, { Component } from 'react'
import NewArtworkForm from '../NewArtworkForm'
import ArtworkList from '../ArtworkList'
import Header from '../Header'


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

	// addArt = async (artToAdd) => {
	// 	console.log(artToAdd);
	// 	try {
	// 		const url = process.env.REACT_APP_API_URL + '/artworks/add'
	// 		const addArtResponse = await fetch(url, {
	// 			credentials: 'include',
	// 			method: 'POST',
	// 			body: JSON.stringify(artToAdd),
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		})

	// 		const addArtJson = await addArtResponse.json()
	// 		console.log(addArtJson);
			
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }

	render(){
		console.log(this.state);
		return (
			<>
				<p> ArtworkContainer </p>
				{
					this.props.adding
					&&
					<NewArtworkForm open={true} addArt={this.addArt} closeAddModal={this.closeAddModal}/>
				}
				<ArtworkList artwork={this.state.artwork}/>
			</>
		)
	}
}