import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogUpdate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('mario');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.data.title);
        setContent(data.data.content);
        setAuthor(data.data.author);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, content, author };

    fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
        navigate('/blogs/' + id);
    });
  }

  return (
    <div className="create">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog content:</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
        <option value="Adam">Adam</option>
        <option value="Eve">Eve</option>
        <option value="Cain">Cain</option>
        </select>
        <button>Save</button>
      </form>
    </div>
  );
}
export default BlogUpdate;