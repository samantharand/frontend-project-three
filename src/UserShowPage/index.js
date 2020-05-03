import React, { Component } from 'react'
import { Modal, Button, Card } from 'semantic-ui-react'
import EditUserModal from '../EditUserModal'
import ArtworkList from '../ArtworkList'


export default class UserShowPage extends Component {
	constructor() {
		super()

		this.state ={

		}
	}

	editUser = async (editInfo) => {
		console.log('edit info from edit user in user show', editInfo);
		try {
			
			// console.log('editinfo from edit user in UserShowPage', editInfo);
			const url = process.env.REACT_APP_API_URL + '/users/' + this.props.currentUser.id

			const editUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(editInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const editUserJson = await editUserResponse.json()
			console.log("Edit User Json", editUserJson);
			if(editUserJson.status === 201) {
				this.props.updateUser(editUserJson)
				// this.props.userToShowData = editUserJson.data
				// call updateUser from parent???? 
			}
		} catch (error) {
			console.error(error)
		}

	}

	// listCards = () => {
	// 	if(this.props.userToShowArtworks) {
	// 		const userArtworkGrid = this.props.userToShowArtworks.map(artwork => {
	// 			return (
	// 				<Card key={artwork.id}>
	// 					<Card.Content>
	// 						<Card.Header>
	// 							{artwork.title}
	// 						</Card.Header>
	// 					</Card.Content>
	// 				</Card>
	// 			)
	// 		})
	// 	}
	// }

	render() {
		console.log("CURRENT USER from UserShowPage", this.props.currentUser);
		console.log("this.props.userToShowData", this.props.userToShowData);
		console.log("userToShowArtworks in USER SHOW PAAAge", this.props.userToShowArtworks);
		
		let userArtworkCard;
		if(this.props.userToShowArtworks) {
			userArtworkCard = this.props.userToShowArtworks.map(artwork => {
				return (
					<Card key={artwork.id}>
						<Card.Content>
							<Card.Header>
								{artwork.title}
							</Card.Header>
						</Card.Content>
					</Card>
				)
			})
		}
		return (
			this.props.userToShowArtworks !== []
			&&
			<Modal closeIcon onClose={this.props.closeShowModal} open={true}>
				<h3>{this.props.userToShowData.username}</h3>
				<Card.Group> {userArtworkCard} </Card.Group>
			
				{
					this.props.currentUser.id === this.props.userToShowData.id
					&&
					<React.Fragment>
						<EditUserModal 
							userToShowData={this.props.userToShowData} 
							editUser={this.editUser}
						/>
					</React.Fragment>
				}
			</Modal>
		)
	
	}
}
				// <ArtworkList artworks={this.props.userToShowArtworks}/>
						// <Button onClick={() => this.props.deleteUser(this.props.userToShowData)}>Delete Account</Button>