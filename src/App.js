import React, { useState, Fragment } from 'react'
import AddLinkForm from './forms/AddLinkForm'
import EditLinkForm from './forms/EditLinkForm'
import LinkTable from './tables/LinkTable'

import YouTubeVideo from "./youtubevideo";
const App = () => {
	// Data
	const usersData = [
  
		{ id: 1,  username: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk&feature=youtu.be' },
		{ id: 2, username: 'https://www.youtube.com/watch?v=ClU3fctbGls' },
		{ id: 3, username: 'https://youtu.be/CwfoyVa980U' },
	]

	const initialFormState = { id: null,  username: '' }

	// Setting state
	const [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id,  username: user.username })
	}
	function YouTubeGetID(url){
		url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);// eslint-disable-next-line
		return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
	}
	const usersIds = users.map(user => YouTubeGetID(user.username));
   const a=Object.values(usersIds);
   
	const videoIDs =a;

	return (
		<div className="container">
			<h1>Youtube Link player</h1>
			<YouTubeVideo users={users} videoIDs={videoIDs} />
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit link</h2>
							<EditLinkForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add links</h2>
							<AddLinkForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View links</h2>
					<LinkTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App
