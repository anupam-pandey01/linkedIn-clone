import React, { useState } from 'react';
import api from '../api/api';

export default function PostCard({ post, onDeleted, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(post.text);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const toggleLike = async () => {
    try {
      const res = await api.post(`api/posts/${post._id}/like`);
      setLikes(res.data.likes);
    } catch(e){ console.error(e); }
  };

  const save = async () => {
    try {
      const res = await api.put(`api/posts/${post._id}`, { text });
      setEditing(false);
      onUpdated && onUpdated(res.data);
      window.location.reload(); 
    } catch(e){ alert('not allowed'); }
  };

  const remove = async () => {
    if (!confirm('Delete post?')) return;
    try {
      await api.delete(`api/posts/${post._id}`);
      onDeleted(post._id);
    } catch(e){ alert('Delete failed'); }
  };

  return (
    <div className="card post">
      <div className="post-header">
        <strong>{post.author?.name || 'Unknown'}</strong>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>

      {editing ? (
        <>
          <textarea value={text} onChange={e=>setText(e.target.value)} />
          <div className="row">
            <button onClick={save} className="btn">Save</button>
            <button onClick={()=>setEditing(false)} className="btn outline">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p>{post.text}</p>
          {post.image && <img src={ import.meta.env.VITE_API_URL + post.image} alt="post" className="post-img" />}
        </>
      )}

      <div className="post-actions">
        <button onClick={toggleLike} className="btn">Like ({likes})</button>
        {user && user.id === post.author?._id && (
          <>
            <button onClick={()=>setEditing(true)} className="btn">Edit</button>
            <button onClick={remove} className="btn outline">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
