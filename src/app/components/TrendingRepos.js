"use client"

import { useEffect, useState } from 'react';
import RepositoryList from './RepositoryList';

export default function TrendingRepos() {
  const [trendingRepos, setTrendingRepos] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const response = await fetch(
        'https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=10'
      );
      const data = await response.json();
      setTrendingRepos(data.items || []);
    };
    fetchTrending();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-10">Trending Repositories</h2>
      <RepositoryList repos={trendingRepos} />
    </div>
  );
}
