import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedContext } from '../context/FeedContext';
import { UploadCloud, X } from 'lucide-react';

const Write = () => {
  const { categories, addPost } = useContext(FeedContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[1]);
  const [imagePreview, setImagePreview] = useState(null);

  const selectableCategories = categories.filter(c => c !== 'All');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addPost({
      title,
      content,
      category,
      image: imagePreview
    });

    navigate('/');
  };

  return (
    <div>
      <header className="feed-header">
        Create Post
      </header>

      <form className="write-form" onSubmit={handleSubmit}>
        
        <div 
          className={`simulated-upload ${imagePreview ? 'has-image' : ''}`}
          onClick={() => !imagePreview && fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            style={{ display: 'none' }} 
          />
          
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <button type="button" className="remove-image-btn" onClick={removeImage}>
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <UploadCloud className="upload-icon" />
              <div className="upload-text">
                Tap to upload an image<br/>
                <small style={{ opacity: 0.7 }}>(Simulated file upload)</small>
              </div>
            </>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="What's your update?" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {selectableCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea 
            className="form-textarea" 
            placeholder="Share details about your progress, learnings, or questions..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={!title.trim() || !content.trim()}>
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default Write;
