"use client";
import { useState, useEffect } from 'react';
import RepositoryList from '../components/RepositoryList';

export default function SavedRepos() {
  const [savedRepos, setSavedRepos] = useState([]);

  // Load saved repositories from local storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedRepos')) || [];
    setSavedRepos(saved);
  }, []);

  // Function to remove a repository from saved list
  const removeFromSaved = (repoId) => {
    const updatedRepos = savedRepos.filter((repo) => repo.id !== repoId);
    setSavedRepos(updatedRepos);
    localStorage.setItem('savedRepos', JSON.stringify(updatedRepos));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Saved Repositories</h2>
      {savedRepos.length === 0 ? (
        <p className="text-gray-500 mt-4">You have no saved repositories.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {savedRepos.map((repo) => (
            <div key={repo.id} className="border rounded p-4 bg-white shadow-lg">
              <h2 className="text-xl font-bold text-blue-600 truncate">{repo.name}</h2>
              <p className="text-gray-700 mt-2">{repo.description || 'No description available.'}</p>
              <div className="flex flex-wrap space-x-4 mt-4 text-sm text-gray-600">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks}</span>
                <span>🐞 {repo.open_issues_count} Issues</span>
                <span>🕒 Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 block"
              >
                View Repository
              </a>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
                onClick={() => removeFromSaved(repo.id)}
              >
                Remove from Saved
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
