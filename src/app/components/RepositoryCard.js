// components/RepositoryCard.js
import Link from 'next/link';

export default function RepositoryCard({ repo, saveToFavorites }) {
  return (
    <div key={repo.id} className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-xl font-semibold text-blue-700">
        <Link href={`/repo/${repo.owner.login}/${repo.name}`}>
          {repo.name}
        </Link>
      </h3>
      <p className="text-gray-600 mt-2">{repo.description || 'No description available'}</p>
      <div className="mt-4 flex gap-6 text-sm text-gray-500">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks}</span>
        <span>🐞 {repo.open_issues_count} Issues</span>
        <span>🕒 Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      <div className="mt-3">
        <span className="inline-block bg-green-200 text-green-700 px-3 py-1 rounded-full text-xs">
          Good First Issue: {repo.open_issues_count > 0 ? 'Available' : 'None'}
        </span>
      </div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mt-4 block"
      >
        View Repository
      </a>
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded mt-4 hover:bg-blue-700 transition"
        onClick={() => saveToFavorites(repo)}
      >
        Save for Later
      </button>
    </div>
  );
}
