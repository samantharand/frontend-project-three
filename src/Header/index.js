import React, { Component } from 'react'
import NewArtworkForm from '../NewArtworkForm'
import { Modal } from 'semantic-ui-react'
import '../index.css'

export default class Header extends Component {
	constructor() {
		super()

		this.state = {
			showModal: false
		}
	}

	showModal = () => {
		if(this.state.showModal){
			this.setState({
				showModal: false
			})
		} else {
			this.setState({
				showModal: true
			})
		}
	}

	// showCurrentUser = () => {
		
	// }

	render() {
		console.log('props', this.props);
		return (
			<div className='Header-nav'>
				<React.Fragment>
				{
					// this.props.mode !== "Home"
					// ?
					<div className='Logo'>
						<img 
							className='fake-link'
							onClick={this.props.goHome}
							src='https://i.imgur.com/gnXUQw6.png'
						/>
					</div>
					// :
					// <div className='LogoSolo'>
					// 	<img src='https://i.imgur.com/DTn833X.png?2'/>
					// </div>
				}
					<div className="Nav">
						<span className='fake-link' onClick={this.props.goHome}>Home</span>
						|
						<span className='fake-link' onClick={this.props.switchMode}>User</span>
						|
						<span className='fake-link' onClick={this.props.switchMode}>Artwork</span>
						{
							this.props.loggedIn
							?
							<React.Fragment>
								<div>
									<span className='fake-link' onClick={this.showModal}>Add Art</span>
									{
										this.state.showModal
										&&
										<Modal 
											open={true}
											closeIcon
											onSubmit={this.showModal}
											onClose={this.showModal}
										> 
											<NewArtworkForm addArt={this.props.addArt}/> 
										</Modal>
									}
									|
									<span className='fake-link'>View Account</span>
									|
									<span className='fake-link' onClick={this.props.logout}>Logout</span>
								</div>
							</React.Fragment>
							:
							<React.Fragment>
								|
								<span className='fake-link' onClick={this.props.switchMode}>Log In / Register</span>
							</React.Fragment>
						}
					</div>
				</React.Fragment>
			</div>
		)		
	}
}