// Function to fetch repository details
async function fetchRepoDetails(owner, repoName) {
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
    if (!repoResponse.ok) {
      throw new Error('Failed to fetch repository details');
    }
    return repoResponse.json();
  }
  
  // Function to fetch contributors
  async function fetchContributors(owner, repoName) {
    const contributorsResponse = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contributors`);
    if (!contributorsResponse.ok) {
      throw new Error('Failed to fetch contributors');
    }
    return contributorsResponse.json();
  }
  
  // Function to fetch open issues
  async function fetchOpenIssues(owner, repoName) {
    const issuesResponse = await fetch(`https://api.github.com/repos/${owner}/${repoName}/issues?state=open`);
    if (!issuesResponse.ok) {
      throw new Error('Failed to fetch issues');
    }
    return issuesResponse.json();
  }
  
  // Function to fetch pull requests
  async function fetchPullRequests(owner, repoName) {
    const pullRequestsResponse = await fetch(`https://api.github.com/repos/${owner}/${repoName}/pulls?state=open`);
    if (!pullRequestsResponse.ok) {
      throw new Error('Failed to fetch pull requests');
    }
    return pullRequestsResponse.json();
  }
  
export default async function RepoDetailsPage({ params }) {
  const { owner, repoName } = await params;

  const [repoData, contributors, openIssues, pullRequests] = await Promise.all([
    fetchRepoDetails(owner, repoName),
    fetchContributors(owner, repoName),
    fetchOpenIssues(owner, repoName),
    fetchPullRequests(owner, repoName),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-2xl rounded-lg p-6 sm:p-8">
        {/* Repo Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">{repoData.name}</h1>
          <p className="text-md sm:text-lg text-gray-300 mt-2">
            {repoData.description || 'No description available'}
          </p>
        </div>

        {/* Introductory Paragraph */}
        <div className="mt-6 text-center">
          <p className="text-sm sm:text-md text-gray-400">
            Welcome to the <span className="font-semibold text-purple-400">{repoData.name}</span> repository! This
            project is designed to provide an in-depth look into the repository’s structure,
            contributors, open issues, and pull requests. Whether you are a developer looking to
            contribute, a project maintainer, or simply exploring, this page has everything you need
            to understand the repository at a glance.
          </p>
        </div>

        {/* Repo Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 bg-gray-700 rounded-lg shadow-lg">
            <p className="text-2xl font-semibold text-purple-400">{repoData.stargazers_count}</p>
            <p className="text-sm text-gray-300">Stars</p>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg shadow-lg">
            <p className="text-2xl font-semibold text-blue-400">{repoData.forks}</p>
            <p className="text-sm text-gray-300">Forks</p>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg shadow-lg">
            <p className="text-2xl font-semibold text-red-400">{repoData.open_issues_count}</p>
            <p className="text-sm text-gray-300">Open Issues</p>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg shadow-lg">
            <p className="text-2xl font-semibold text-green-400">
              {new Date(repoData.updated_at).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-300">Last Updated</p>
          </div>
        </div>

        {/* Contributors Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-100">Top Contributors</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contributors.slice(0, 6).map((contributor) => (
              <a
                key={contributor.id}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <span className="text-gray-100 font-medium">{contributor.login}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Open Issues Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-100">Open Issues</h2>
          <ul className="mt-4 space-y-3">
            {openIssues.slice(0, 5).map((issue) => (
              <li key={issue.id}>
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-100 bg-gray-700 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-600"
                >
                  {issue.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Pull Requests Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-100">Pull Requests</h2>
          <ul className="mt-4 space-y-3">
            {pullRequests.slice(0, 5).map((pr) => (
              <li key={pr.id}>
                <a
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-100 bg-gray-700 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-600"
                >
                  {pr.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Section */}
        <div className="mt-10 text-center">
          <a
            href={repoData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-300"
          >
            Visit Repository
          </a>
        </div>
      </div>
    </div>
  );
}
  
  