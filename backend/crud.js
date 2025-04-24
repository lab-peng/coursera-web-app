import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432
});


class Response {
    constructor(status = false, code = 400, message = "", data = null) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}


export const getBlogs = (_, res) => {
    const rs = new Response();
    pool.query('SELECT * FROM blogs', (error, results) => {
        if (error) {
            throw error
        }
        rs.status = true;
        rs.code = 200;
        rs.message = "Success";
        rs.data = results.rows;

        res.status(200).json(rs);
    })
}

export const getBlogById = (req, res) => {
    const rs = new Response();
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM blogs WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0) {
            rs.status = true;
            rs.code = 404;
            rs.message = "Blog not found";
            rs.data = null;
        } else {
            rs.status = true;
            rs.code = 200;
            rs.message = "Success";
            rs.data = results.rows[0];
        }
        res.status(200).json(rs);
    })
}

export const createBlog = (req, res) => {
    const { title, content, author } = req.body;
    const rs = new Response();
    pool.query('INSERT INTO Blogs (title, content, author, created) VALUES ($1, $2, $3, current_timestamp)', [title, content, author], (error,  _) => {
        if (error) {
            throw error
        }
        rs.status = true;
        rs.code = 201;
        rs.message = "Blog added";
        rs.data = null;
        res.status(201).send(rs);
    })
}

export const updateBlog = (req, res) => {
    const id = parseInt(req.params.id);
    const rs = new Response();
    try {
        const { title, content, author } = req.body;
        pool.query('UPDATE blogs SET title = $1, content = $2, author = $3 WHERE id = $4', [title, content, author, id], (error, results) => {
            if (error) {
                throw error
            }
            if (results.rowCount == 0) {
                rs.status = true;
                rs.code = 404;
                rs.message = "Blog to be modified not found";
                rs.data = null;
                res.status(404).send(rs);
            } else {
                rs.status = true;
                rs.code = 200;
                rs.message = "Blog modification succeeded";
                rs.data = null;
                res.status(200).send(rs);
            }
        })
    } catch (error) {
        rs.status = false;
        rs.code = 500;
        rs.message = error.message;
        rs.data = null
        res.status(500).json(rs);
    }
}


export const deleteBlog = (req, res) => {
    const id = parseInt(req.params.id);
    const rs = new Response();
    pool.query('DELETE FROM Blogs WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        } 
        if (results.rowCount == 0) {
            rs.status = true;
            rs.code = 404;
            rs.message = "Blog to be deleted not found";
            rs.data = null;
            res.status(404).send(rs);
        } else {
            rs.status = true;
            rs.code = 201;
            rs.message = "Blog deleted";
            rs.data = null;
            res.status(201).send(rs);
        }

    })
}
