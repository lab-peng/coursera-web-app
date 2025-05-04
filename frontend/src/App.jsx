import Navbar from './Navbar'
import Home from './Home';
import BlogCreate from './BlogCreate';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogDetail from './BlogDetail';
import BlogUpdate from './BlogUpdate';
import NotFound from './NotFound';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<BlogCreate />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/:id/edit" element={<BlogUpdate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
