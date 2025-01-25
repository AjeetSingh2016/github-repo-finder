import RepositoryCard from './RepositoryCard';  // Import the RepositoryCard component

export default function RepositoryList({ repos }) {
  if (!repos || repos.length === 0) {
    return <p className="text-gray-400 mt-4 text-center">No repositories found.</p>;
  }

  const saveToFavorites = (repo) => {
    const savedRepos = JSON.parse(localStorage.getItem('savedRepos')) || [];
    localStorage.setItem('savedRepos', JSON.stringify([...savedRepos, repo]));
    alert('Repository saved!');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {repos.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} saveToFavorites={saveToFavorites} />
      ))}
    </div>
  );
}