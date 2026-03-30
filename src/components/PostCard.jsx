import { Heart } from 'lucide-react';
import { useContext } from 'react';
import { FeedContext } from '../context/FeedContext';

const PostCard = ({ post }) => {
  const { toggleLike } = useContext(FeedContext);

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.author.avatar} alt={post.author.name} className="avatar" />
        <div>
          <div className="post-author">{post.author.name}</div>
          <div className="post-date">{post.date}</div>
        </div>
      </div>
      
      {post.image && (
        <div className="post-image-container">
          <img src={post.image} alt={post.title} className="post-image" />
        </div>
      )}

      <div className="post-actions">
        <button 
          className={`action-btn ${post.hasLiked ? 'liked' : ''}`}
          onClick={() => toggleLike(post.id)}
        >
          <Heart className="action-icon" fill={post.hasLiked ? 'currentColor' : 'none'} />
          <span>{post.likes}</span>
        </button>
      </div>

      <div className="post-content">
        <span className="post-category">{post.category}</span>
        <b>{post.title}</b>
        <p style={{ marginTop: '8px' }}>{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard;
