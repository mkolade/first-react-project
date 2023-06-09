import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
  const [author,setAuthor] = useState('mario');
  const [isPending,setisPending] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    
    setisPending(true);
    const newBlog = {title,body,author};

    fetch('http://localhost:8000/blogs/',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newBlog)
    }).then(() => {
      console.log('New blog Added')
      setisPending(false);
      /* navigate(-1)  OR*/
      navigate('/')
    })
  }

  return (
    <div className='create'>
      <h2>Add a New Blog</h2>
      <form  onSubmit={handleSubmit}>
        <label >Blog Title:</label>
        <input 
          type="text"
          required
          value={title}
          onChange = { (e) => setTitle(e.target.value)}
        />

        <label >Blog Body:</label>
        <textarea 
          required
          type="text"
          value={body}
          onChange = { (e) => setBody(e.target.value)}
        ></textarea>

        <label >Blog Author</label>
        <select 
          value={author}
          onChange = { (e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  )
}

export default Create
