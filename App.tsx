
import React, { useState, useMemo } from 'react';
import { postsData, authorData } from './data';
import { layoutSettings } from './settings';
import Sidebar from './components/Sidebar';
import PostContent from './components/PostContent';
import GraphView from './components/GraphView';
import { BlogPost } from './types';
import { ArrowLeft, Calendar, ChevronRight, List, Share2, User } from 'lucide-react';

const App: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'graph' | 'about'>('list');

  const allTags = useMemo(() => {
    return postsData.flatMap(post => post.tags);
  }, []);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return postsData;
    return postsData.filter(post => 
      post.tags.some(tagPath => tagPath.split('/').includes(selectedTag))
    );
  }, [selectedTag]);

  const groupedPosts = useMemo(() => {
    const sorted = [...filteredPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const groups: Record<number, BlogPost[]> = {};
    
    sorted.forEach(post => {
      const year = new Date(post.date).getFullYear();
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });

    return Object.entries(groups)
      .map(([year, posts]) => ({ year: parseInt(year), posts }))
      .sort((a, b) => b.year - a.year);
  }, [filteredPosts]);

  const selectedPost = useMemo(() => {
    return postsData.find(p => p.id === selectedPostId);
  }, [selectedPostId]);

  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    setViewMode('list');
    window.scrollTo(0, 0);
  };

  const handleTagFilter = (tag: string | null) => {
    setSelectedTag(tag);
    setSelectedPostId(null);
    if (viewMode === 'about') setViewMode('list');
  };

  const handleShowAbout = () => {
    setViewMode('about');
    setSelectedPostId(null);
    setSelectedTag(null);
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setSelectedPostId(null);
    setSelectedTag(null);
    setViewMode('list');
    window.scrollTo(0, 0);
  };

  return (
    <div className={`min-h-screen ${layoutSettings.containerMaxWidth} mx-auto px-4 py-12 md:px-8`}>
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 
            className="text-5xl font-bold serif cursor-pointer hover:text-blue-600 transition-colors inline-block"
            onClick={handleGoHome}
          >
            Günlük.
          </h1>
          <p className="text-gray-500 mt-2 font-light">Dijital bahçem ve ilişkisel notlarım.</p>
        </div>

        {!selectedPostId && (
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 self-start md:self-end">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <List size={16} /> Liste
            </button>
            <button 
              onClick={() => setViewMode('graph')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'graph' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Share2 size={16} /> Bilgi Ağı
            </button>
          </div>
        )}
      </header>

      <div className={`grid grid-cols-1 lg:grid-cols-12 ${layoutSettings.gridGap}`}>
        <main className={layoutSettings.mainContentSpan}>
          {selectedPostId && selectedPost ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={() => setSelectedPostId(null)}
                className="flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors group"
              >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Geri Dön
              </button>
              <div className="mb-8">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center"><Calendar size={14} className="mr-1" /> {selectedPost.date}</span>
                </div>
                <h2 className="text-4xl font-bold serif mb-6">{selectedPost.title}</h2>
                {selectedPost.imageUrl && (
                  <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-80 object-cover rounded-3xl mb-10 shadow-xl shadow-blue-500/5" />
                )}
                <PostContent content={selectedPost.content} />
              </div>
            </div>
          ) : viewMode === 'about' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 text-blue-600 mb-6">
                <User size={24} />
                <span className="text-sm font-bold uppercase tracking-widest">Hakkımda</span>
              </div>
              <PostContent content={authorData.aboutContent || ""} />
            </div>
          ) : viewMode === 'graph' ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-white p-2 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <GraphView 
                  posts={postsData} 
                  onNavigate={handlePostClick} 
                  onTagFilter={(tag) => { handleTagFilter(tag); setViewMode('list'); }}
                  compact={false}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-12 animate-in fade-in duration-500">
              {selectedTag && (
                <div className="bg-blue-50 p-4 rounded-xl flex items-center justify-between">
                  <span className="text-blue-700 font-medium">
                    Filtrelenen Konu: <span className="font-bold">#{selectedTag}</span>
                  </span>
                  <button 
                    onClick={() => setSelectedTag(null)}
                    className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200"
                  >
                    Tüm Yazılar
                  </button>
                </div>
              )}

              {groupedPosts.length > 0 ? (
                groupedPosts.map((group) => (
                  <section key={group.year} className="relative pl-8 border-l border-gray-100">
                    <div className="absolute -left-[5px] top-0 w-[10px] h-[10px] rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                    <h3 className="text-3xl font-bold serif text-gray-300 mb-8">{group.year}</h3>
                    <div className="space-y-8">
                      {group.posts.map(post => (
                        <article 
                          key={post.id} 
                          className="group cursor-pointer bg-white p-6 rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
                          onClick={() => handlePostClick(post.id)}
                        >
                          <div className="flex flex-col md:flex-row md:items-start gap-6">
                            {post.imageUrl && (
                              <div className="w-full md:w-48 md:h-32 flex-shrink-0">
                                <img src={post.imageUrl} className="w-full h-full object-cover rounded-xl shadow-sm" alt={post.title} />
                              </div>
                            )}
                            <div className="flex-1">
                              <span className="text-sm text-gray-400 font-medium block mb-1">{post.date}</span>
                              <h4 className="text-xl font-bold group-hover:text-blue-600 transition-colors mb-2">{post.title}</h4>
                              <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                  <span key={tag} className="text-xs text-gray-400 group-hover:text-blue-400 transition-colors">#{tag}</span>
                                ))}
                              </div>
                            </div>
                            <ChevronRight className="hidden md:block text-gray-300 group-hover:text-blue-500 transition-colors mt-6" />
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400">Bu etiketle ilişkili yazı bulunamadı.</p>
                </div>
              )}
            </div>
          )}
        </main>

        <div className={layoutSettings.sidebarSpan}>
          <Sidebar 
            author={authorData} 
            allTags={allTags}
            posts={postsData}
            selectedTag={selectedTag}
            onTagClick={handleTagFilter}
            onPostClick={handlePostClick}
            onAboutClick={handleShowAbout}
          />
        </div>
      </div>
      
      <footer className="mt-20 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm pb-12">
        <p>&copy; {new Date().getFullYear()} {authorData.name}. Bilgi ağı tasarımı.</p>
      </footer>
    </div>
  );
};

export default App;
