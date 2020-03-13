import React from 'react'

const LinkTable = props => (
  <table>
    <thead>
      <tr>
        
        <th>Link</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <p></p>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            
            <td>{user.username}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(user)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteUser(user.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No Links</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default LinkTable
