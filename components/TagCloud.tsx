
import React from 'react';

interface TagCloudProps {
  tags: string[];
  selectedTag: string | null;
  onTagClick: (tag: string | null) => void;
}

const TagCloud: React.FC<TagCloudProps> = ({ tags, selectedTag, onTagClick }) => {
  // Count tag occurrences
  const tagCounts = tags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniqueTags = Object.keys(tagCounts).sort();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Etiket Bulutu</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagClick(null)}
          className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
            selectedTag === null
              ? 'bg-blue-600 text-white shadow-md scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Hepsi
        </button>
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
              selectedTag === tag
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            #{tag} <span className="opacity-50 ml-1 text-xs">({tagCounts[tag]})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
