import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* <h1>The MicroBlog</h1> */}
            <h1><Link to="/">The MicroBlog</Link></h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
            </div>
        </nav>
    );
}
export default Navbar;