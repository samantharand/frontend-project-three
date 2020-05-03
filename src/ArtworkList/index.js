import React from 'react'
import '../index.css'
import { Card, Image } from 'semantic-ui-react'

export default function ArtworkList(props) {
	console.log('PROPS.artworks in ArtworkList', props.artworks);
	const listedArtwork = props.artworks.map(artwork => {
		return (
			<Card key={artwork.id}> 
				<Card.Content>
					<div className="imageThumbnail">
						<Image 
							onClick={() => props.switchMode(artwork.id)} 
							className='fake-link'
							src={artwork.image}
						/>
					</div>
					<Card.Header 
						className='fake-link'
						onClick={() => props.switchMode(artwork.id)}
					>
						{artwork.title} 
					</Card.Header>
					<Card.Meta>
						<strong>Medium:</strong> {artwork.medium} 
					</Card.Meta>
					<Card.Description>
						<strong>By:</strong> {artwork.artist.username.toUpperCase()} 
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