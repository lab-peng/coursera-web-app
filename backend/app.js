import express from 'express';
import cors from 'cors';
import { getBlogs, getBlogById, updateBlog, deleteBlog, createBlog } from './crud.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/blogs', getBlogs);
app.get("/blogs/:id", getBlogById);
app.put("/blogs/:id", updateBlog);
app.delete("/blogs/:id", deleteBlog);
app.post("/blogs", createBlog);


app.listen(5000, () => {
  console.log('Server is running on port 5000');
})