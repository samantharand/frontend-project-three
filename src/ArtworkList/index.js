import React from 'react'
import { Card } from 'semantic-ui-react'

export default function ArtworkList(props) {
	console.log('PROPS.artwork', props.artwork);
	const listedArtwork = props.artwork.map(artwork => {
		return (
			<Card key={artwork.id}> 
				<Card.Content>
					<Card.Header>
						{artwork.title} 
					</Card.Header>
					<Card.Meta>
						{artwork.medium} 
					</Card.Meta>
					<Card.Description>
						{artwork.artist.username} 
					</Card.Description>
				</Card.Content>
			</Card>
		)
	})
	return (
		<React.Fragment>
			<h3> ArtworkList </h3>
			<Card.Group centered={true}> 
				{listedArtwork} 
			</Card.Group>
		</React.Fragment>
	)
}