import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams();
    const { data:blog, isLoading, error } = useFetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`);  
    const navigate = useNavigate();

    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = () => {
        setIsDeleting(true);
        fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setIsDeleting(false);
            navigate('/');
        })
    };
    
    return ( 
        <div className="blog-detail">
            { isLoading && <div>Loading ... </div>}
            { error && <div>{ error }</div>}
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Authored By {blog.author}</p>
                    <div>
                        {blog.content}
                    </div>
                <div className="buttons">
                    {!isDeleting && <button onClick={handleDelete}>Delete</button>}
                    {isDeleting && <button>Deleting ...</button>}
                    <Link to={`/blogs/${blog.id}/edit`}><button>Edit</button></Link> 
                </div>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetail;