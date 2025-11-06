import React, { useState } from 'react';
import api from '../api/api';

export default function CreatePost({ onPosted }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('text', text);
      if (file) form.append('image', file);
      const res = await api.post('/api/posts', form, { headers: { 'Content-Type': 'multipart/form-data' }});
      setText(''); setFile(null);
      onPosted(res.data);
    } catch (err) { alert(err.response?.data?.message || 'Failed'); }
  };

  return (
    <form className="card" onSubmit={submit}>
      <textarea placeholder="What's on your mind?" value={text} onChange={e=>setText(e.target.value)} />
      <div className="row">
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <button className="btn">Post</button>
      </div>
    </form>
  );
}
