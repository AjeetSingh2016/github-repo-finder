"use client";
import { useState } from 'react';
import LanguageDropdown from './components/LanguageDropdown';
import Filters from './components/Filters';
import RepositoryList from './components/RepositoryList';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
  const [filters, setFilters] = useState({ label: '' });
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);
    try {
      const query = `language:${selectedLanguage}${filters.label ? `+label:${filters.label}` : ''}`;
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=10`
      );
      const data = await response.json();
      setRepos(data.items || []);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
        GitHub Finder for Open Source Contributors
      </h1>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center gap-6">
          <LanguageDropdown
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={fetchRepositories}
          >
            {loading ? 'Fetching...' : 'Find Repositories'}
          </button>
        </div>
      </div>

      {/* Display Repositories */}
      {repos.length > 0 && !loading && (
        <RepositoryList repos={repos} />
      )}

      {/* Loader when fetching */}
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full border-t-4 border-blue-600 w-16 h-16"></div>
        </div>
      )}
    </div>
  );
}
