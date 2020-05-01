import React from 'react'
import { Card } from 'semantic-ui-react'

export default function UserList(props) {
	const usersListed = props.users.map(user => {
		return (	
			<Card key={user.id}> 
				<Card.Content>
					<Card.Header>
						{user.username}
					</Card.Header>
					<Card.Description>
						{user.bio}
					</Card.Description>
				</Card.Content>
			</Card>
		)
	})
	return (
		<div>
			<Card.Group centered={true}> 
				{usersListed} 
			</Card.Group>
		</div>
	)
}