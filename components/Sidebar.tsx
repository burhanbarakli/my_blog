
import React from 'react';
import { Author, BlogPost } from '../types';
import TagCloud from './TagCloud';
import GraphView from './GraphView';
import { UserCircle } from 'lucide-react';

interface SidebarProps {
  author: Author;
  allTags: string[];
  posts: BlogPost[];
  selectedTag: string | null;
  onTagClick: (tag: string | null) => void;
  onPostClick: (postId: string) => void;
  onAboutClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  author, 
  allTags, 
  posts, 
  selectedTag, 
  onTagClick, 
  onPostClick,
  onAboutClick 
}) => {
  return (
    <aside className="flex flex-col gap-6 sticky top-8">
      {/* 1. Personal Info Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="relative pt-12 text-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-24 h-24 rounded-full border-4 border-white mx-auto shadow-lg object-cover"
          />
          <h2 className="mt-4 text-xl font-bold text-gray-900">{author.name}</h2>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed px-2">
            {author.bio}
          </p>
          
          <div className="mt-6">
            <button 
              onClick={onAboutClick}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl font-medium transition-all duration-300 border border-gray-100 hover:border-blue-100 group"
            >
              <UserCircle size={18} className="group-hover:scale-110 transition-transform" />
              Hakkımda
            </button>
          </div>
        </div>
      </div>

      {/* 2. Graph View (Obsidian Style) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <GraphView 
          posts={posts} 
          onNavigate={onPostClick} 
          onTagFilter={onTagClick}
          compact={true}
        />
      </div>

      {/* 3. Tag Cloud */}
      <TagCloud tags={allTags} selectedTag={selectedTag} onTagClick={onTagClick} />
    </aside>
  );
};

export default Sidebar;
