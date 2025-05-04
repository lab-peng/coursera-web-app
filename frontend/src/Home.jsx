import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    const {data: blogs, isLoading, error} = useFetch(`${import.meta.env.VITE_API_URL}/blogs`)
    // console.log(blogs);

    return ( 
        <div className="home">
            { error && <div>{error}</div>}
            { isLoading && <div>Loading ... </div>}
            {blogs && <BlogList blogs={blogs}  title="All Blogs"/>}
            {blogs && <BlogList blogs={blogs.filter((blog) => blog.author === 'Eve')}  title="Eve's Blogs"/>}
        </div>
     );
}
 
export default Home;