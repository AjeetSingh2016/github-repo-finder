"use client"

import { useState, useEffect } from 'react';
import RepositoryList from '../components/RepositoryList';

export default function TrendingRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrendingRepos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=10'
      );
      const data = await response.json();
      setRepos(data.items || []);
    } catch (error) {
      console.error('Error fetching trending repositories:', error);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingRepos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Trending Repositories</h2>
      {/* <button
        className="bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600 transition"
        onClick={fetchTrendingRepos}
      >
        {loading ? 'Fetching...' : 'Fetch Trending Repositories'}
      </button> */}
      <RepositoryList repos={repos} />
    </div>
  );
}
