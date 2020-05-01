import React from 'react'

export default function ArtworkList(props) {
	console.log('PROPS.artwork', props.artwork);
	const listedArtwork = props.artwork.map(artwork => {
		return (
			<li key={artwork.id}> {artwork.title} by {artwork.artist.username} </li>
		)
	})
	return (
		<React.Fragment>
			<p> ArtworkList </p>
			<ul> {listedArtwork} </ul>
		</React.Fragment>
	)
}