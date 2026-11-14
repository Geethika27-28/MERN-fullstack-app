import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/posts";

function App() {

    const [posts, setPosts] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [editingId, setEditingId] = useState(null);

    // READ - Fetch all blog posts
    const fetchPosts = async () => {

        try {

            const response = await axios.get(API);

            setPosts(response.data);

        } catch (error) {

            console.log("Error fetching posts:", error.message);

        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // CREATE and UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Please fill all fields");
            return;
        }

        const payload = {
            title,
            content
        };

        try {

            if (editingId) {

                await axios.put(`${API}/${editingId}`, payload);

                alert("Blog updated successfully");

            } else {

                await axios.post(API, payload);

                alert("Blog added successfully");

            }

            setTitle("");
            setContent("");
            setEditingId(null);

            fetchPosts();

        } catch (error) {

            alert(`Unable to save blog: ${error.response?.data?.message || error.message}`);

        }
    };

    // EDIT
    const handleEdit = (post) => {

        setTitle(post.title);
        setContent(post.content);

        setEditingId(post._id);

    };

    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (confirmDelete) {

            try {

                await axios.delete(`${API}/${id}`);

                alert("Blog deleted successfully");

                fetchPosts();

                if (editingId === id) {
                    setTitle("");
                    setContent("");
                    setEditingId(null);
                }

            } catch (error) {

                alert("Unable to delete blog");

            }
        }
    };

    // Cancel editing
    const handleCancel = () => {

        setTitle("");
        setContent("");
        setEditingId(null);

    };

    return (

        <div className="container">

            <h1>My Blog Application</h1>

            {/* Blog Form */}

            <form onSubmit={handleSubmit}>

                <h2>
                    {editingId ? "Edit Blog" : "Create New Blog"}
                </h2>

                <input
                    type="text"
                    placeholder="Enter Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Write Blog Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit">
                    {editingId ? "Update Blog" : "Add Blog"}
                </button>

                {editingId && (

                    <button
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                )}

            </form>

            {/* Display Blog Posts */}

            <h2>All Blog Posts</h2>

            <div className="posts">

                {posts.length === 0 ? (

                    <p>No blog posts available.</p>

                ) : (

                    posts.map((post) => (

                        <div className="post-card" key={post._id}>

                            <h3>{post.title}</h3>

                            <p>{post.content}</p>

                            <button
                                onClick={() => handleEdit(post)}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(post._id)}
                            >
                                Delete
                            </button>

                        </div>

                    ))

                )}

            </div>

        </div>

    );
}

export default App;