import { createContext, useState } from 'react';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [currentUser] = useState({
    id: 'user1',
    name: 'WIV Builder',
    avatar: 'https://i.pravatar.cc/150?u=wiv',
    bio: 'Building awesome things at the WIV hackathon! 💻✨'
  });

  const [posts, setPosts] = useState(() => {
    const defaultPosts = [
      {
        id: '1',
        author: { // Duplicating data here to avoid initialization reference issues
          id: 'user1',
          name: 'WIV Builder',
          avatar: 'https://i.pravatar.cc/150?u=wiv'
        },
        title: 'First Day at Buildathon!',
        content: 'So excited to start building this project. The energy here is amazing!',
        category: '#General',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
        likes: 5,
        hasLiked: false,
        date: '2h ago'
      },
      {
        id: '2',
        author: {
          id: 'user2',
          name: 'Sarah Kim',
          avatar: 'https://i.pravatar.cc/150?u=sarah'
        },
        title: 'Figured out React State',
        content: 'It took a while, but I finally understand how useState and props work together. Small wins!',
        category: '#TodayILearned',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
        likes: 12,
        hasLiked: true,
        date: '4h ago'
      }
    ];

    const savedLikes = JSON.parse(localStorage.getItem('vibefeed_likes') || '{}');
    
    return defaultPosts.map(post => {
      if (savedLikes[post.id]) {
        return { 
          ...post, 
          likes: savedLikes[post.id].likes, 
          hasLiked: savedLikes[post.id].hasLiked 
        };
      }
      return post;
    });
  });

  const categories = ['All', '#TodayILearned', '#ProjectProgress', '#NeedAdvice', '#General'];

  const addPost = (newPost) => {
    setPosts([{
      ...newPost,
      id: Date.now().toString(),
      author: currentUser,
      likes: 0,
      hasLiked: false,
      date: 'Just now'
    }, ...posts]);
  };

  const toggleLike = (postId) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post => {
        if (post.id === postId) {
          const newHasLiked = !post.hasLiked;
          const newLikes = newHasLiked ? post.likes + 1 : post.likes - 1;
          
          return {
            ...post,
            hasLiked: newHasLiked,
            likes: newLikes
          };
        }
        return post;
      });

      // Save only the like states to localStorage mapping to keep it separated
      const likesMap = JSON.parse(localStorage.getItem('vibefeed_likes') || '{}');
      updatedPosts.forEach(post => {
        likesMap[post.id] = { hasLiked: post.hasLiked, likes: post.likes };
      });
      localStorage.setItem('vibefeed_likes', JSON.stringify(likesMap));

      return updatedPosts;
    });
  };

  return (
    <FeedContext.Provider value={{
      currentUser,
      posts,
      categories,
      addPost,
      toggleLike
    }}>
      {children}
    </FeedContext.Provider>
  );
};
