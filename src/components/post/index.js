import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard(props) {
  console.log(props)
  //const { title, author, description, content, slug, createdAt, updatedAt } = props.posts
   return(
    <div className="card" style={{width: '18rem'}}>
      {/* <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">By {author} on {createdAt}</h6>
        <p className="card-text">{description}</p>
        <Link to="#" className="card-link">Read More</Link>
      </div> */}
    </div>
  )
}