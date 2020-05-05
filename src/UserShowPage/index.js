import React, { Component } from 'react'
import { Modal, Button, Card, Image } from 'semantic-ui-react'
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
		// console.log("CURRENT USER from UserShowPage", this.props.currentUser);
		console.log("this.props.userToShowData", this.props.userToShowData);
		// console.log("userToShowArtworks in USER SHOW PAAAge", this.props.userToShowArtworks);
		
		// console.log(this.props.userToShowData.about.length);
		let userArtworkCard;
		// const bio = this.props.userToShowData.about
		// console.log(bio);
		if(this.props.userToShowArtworks) {
			userArtworkCard = this.props.userToShowArtworks.map(artwork => {
				return (
					<Card key={artwork.id}> 
						<Card.Content>
							<div className="imageThumbnailInShowPage">
								<Image 
									src={artwork.image}
								/>
							</div>
							<Card.Header>
								{artwork.title} 
							</Card.Header>
							<Card.Meta>
								<strong>Medium:</strong> {artwork.medium} 
							</Card.Meta>
						</Card.Content>
					</Card>
				)
			})
		}
		return (
			this.props.userToShowArtworks !== []
			&&
			<Modal closeIcon onClose={this.props.closeShowModal} open={true}>
				<div className="insideModalInfo">
					<h3>{this.props.userToShowData.username}</h3>
					<p><i>{this.props.userToShowData.location}</i></p>
					<p><strong>Age:</strong> {this.props.userToShowData.age}</p>
					{
						this.props.userToShowData.bio !== ""
						&&
						<p><strong>About:</strong> {this.props.userToShowData.bio}</p>
					}
					{
						this.props.userToShowArtworks.length !== 0
						?
						<React.Fragment>
							<p><strong>Uploaded Art</strong></p>
							<Card.Group> {userArtworkCard} </Card.Group>
						</React.Fragment>
						:
						<p><i>No art uploaded yet :( </i></p>
					}
				
					{
						this.props.currentUser.id === this.props.userToShowData.id
						&&
						<React.Fragment>
							<EditUserModal 
								userToShowData={this.props.userToShowData} 
								editUser={this.editUser}
							/>
							<Button onClick={() => this.props.deleteUser(this.props.userToShowData)}>Delete Account</Button>
						</React.Fragment>
					}
				</div>
			</Modal>
		)
	
	}
}
				// <ArtworkList artworks={this.props.userToShowArtworks}/>