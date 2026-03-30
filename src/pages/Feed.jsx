import { useContext, useState } from 'react';
import { FeedContext } from '../context/FeedContext';
import PostCard from '../components/PostCard';
import { Heart } from 'lucide-react';

const Feed = () => {
  const { posts, categories } = useContext(FeedContext);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div>
      <header className="feed-header" style={{ justifyContent: 'space-between' }}>
        <span>VibeFeed ✨</span>
        <Heart size={24} color="var(--primary)" fill="var(--primary)" />
      </header>

      <div className="category-scroll">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ paddingBottom: '20px' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
            No posts found in this category. Be the first to post!
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
