import React, { useState } from 'react'

const AddLinkForm = props => {
	const initialFormState = { id: null, username: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!user.username) return

				props.addUser(user)
				setUser(initialFormState)
			}}
		>
			<label>Link(Youtube only)</label>
			<input type="text" name="username" value={user.username} onChange={handleInputChange} />
			<button>Add new link</button>
		</form>
	)
}

export default AddLinkForm
