import React, { useEffect, useState } from 'react';
import api from '../api/api';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

export default function Feed(){
  const [posts, setPosts] = useState([]);

  const fetch = async () => {
    const res = await api.get('/posts');
    setPosts(res.data);
  };

  useEffect(()=>{ fetch() }, []);

  return (
    <div>
      <h2>Feed</h2>
      <CreatePost onPosted={(p)=>setPosts(prev=>[p, ...prev])} />
      <div>
        {posts.map(p => <PostCard key={p._id} post={p} onDeleted={(id)=>setPosts(prev=>prev.filter(x=>x._id!==id))} />)}
      </div>
    </div>
  );
}
