import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/CommentSection.css';

const API_BASE_URL = 'https://recipe-api-env.eba-vbe3vcqe.us-east-1.elasticbeanstalk.com';

function CommentSection({ recipeId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/comments/${recipeId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('recipeId', recipeId);
    formData.append('text', text);
    if (image) formData.append('image', image);

    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_BASE_URL}/api/comments`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setText('');
      setImage(null);
      fetchComments();
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  return (
    <div className="comment-section">
      <h3>Leave a Comment</h3>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Post Comment</button>
      </form>

      <div className="comment-list">
        {comments.map((comment, i) => (
          <div key={i} className="comment-box">
            <p><strong>{comment.username}</strong>: {comment.text}</p>
            {comment.imageUrl && (
              <img
                src={`${API_BASE_URL}${comment.imageUrl}`}
                alt="Comment"
                className="comment-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
