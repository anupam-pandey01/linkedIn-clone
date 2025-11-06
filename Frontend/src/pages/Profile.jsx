import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams } from 'react-router';
import PostCard from '../components/PostCard';

export default function Profile(){
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    (async ()=>{
      try {
        const uPosts = await api.get(`/api/posts/user/${id}`);
        setPosts(uPosts.data);
        // for name show from first post author or local storage if it's current user
        if (uPosts.data[0]) setUser(uPosts.data[0].author);
        else setUser(JSON.parse(localStorage.getItem('user') || 'null'));
      } catch(e){}
    })();
  }, [id]);

  return (
    <div>
      <h2>{user?.name || 'Profile'}</h2>
      <div>
        {posts.map(p => <PostCard key={p._id} post={p} onDeleted={(id)=>setPosts(prev=>prev.filter(x=>x._id!==id))} />)}
      </div>
    </div>
  );
}
