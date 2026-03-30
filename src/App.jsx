import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import Write from './pages/Write';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
import { FeedProvider } from './context/FeedContext';
import './index.css';
import './styles/components.css';

function App() {
  return (
    <FeedProvider>
      <Router>
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/write" element={<Write />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Navigation />
        </div>
      </Router>
    </FeedProvider>
  );
}

export default App;
