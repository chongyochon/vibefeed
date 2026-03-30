import { useContext } from 'react';
import { FeedContext } from '../context/FeedContext';
import PostCard from '../components/PostCard';

const Profile = () => {
  const { currentUser, posts } = useContext(FeedContext);
  
  const myPosts = posts.filter(post => post.author.id === currentUser.id);
  const totalLikes = myPosts.reduce((acc, curr) => acc + curr.likes, 0);

  return (
    <div>
      <header className="feed-header">
        Profile
      </header>

      <div className="profile-header">
        <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar" />
        <div className="profile-info">
          <h2 className="profile-name">{currentUser.name}</h2>
          <p className="profile-bio">{currentUser.bio}</p>
        </div>
        
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{myPosts.length}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{totalLikes}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px', fontWeight: 600, borderBottom: '1px solid var(--border-color)' }}>
        My Posts
      </div>

      <div style={{ paddingBottom: '20px' }}>
        {myPosts.length > 0 ? (
          myPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
            You haven't posted anything yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
