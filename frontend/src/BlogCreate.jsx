import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const BlogCreate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('Adam');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, content, author};
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(blog)
        }).then(() => {
            setIsLoading(false);
            navigate('/');
        })
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Content</label>
                <textarea 
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <label>Blog Author</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Adam">Adam</option>
                    <option value="Eve">Eve</option>
                    <option value="Cain">Cain</option>
                </select>
                {!isLoading && <button>Add Blog</button>}
                {isLoading && <button>Adding Blog ...</button>}
            </form>
        </div>
    );
}

 
export default BlogCreate;
