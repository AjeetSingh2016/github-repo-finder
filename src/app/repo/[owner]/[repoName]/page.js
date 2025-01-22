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
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          {/* Repo Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">{repoData.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{repoData.description || 'No description available'}</p>
          </div>
  
          {/* Introductory Paragraph */}
          <div className="mt-6 text-center">
            <p className="text-md text-gray-700">
              Welcome to the <span className="font-semibold">{repoData.name}</span> repository! This project is designed to provide an in-depth look into the repository’s structure, contributors, open issues, and pull requests. Whether you are a developer looking to contribute, a project maintainer, or simply exploring, this page has everything you need to understand the repository at a glance.
            </p>
          </div>
  
          {/* Repo Stats */}
          <div className="flex justify-around items-center mt-8">
            <div className="text-center">
              <p className="text-2xl font-semibold text-indigo-500">{repoData.stargazers_count}</p>
              <p className="text-sm text-gray-500">Stars</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-green-500">{repoData.forks}</p>
              <p className="text-sm text-gray-500">Forks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-red-500">{repoData.open_issues_count}</p>
              <p className="text-sm text-gray-500">Open Issues</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-blue-500">
                {new Date(repoData.updated_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">Last Updated</p>
            </div>
          </div>
  
          {/* Contributors Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800">Top Contributors</h2>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {contributors.slice(0, 6).map((contributor) => (
                <a
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="text-gray-700 font-medium">{contributor.login}</span>
                </a>
              ))}
            </div>
          </div>
  
          {/* Open Issues Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-black">Open Issues</h2>
            <ul className="mt-4 space-y-3">
              {openIssues.slice(0, 5).map((issue) => (
                <li key={issue.id}>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-800 bg-gray-100 px-4 py-3 rounded-lg shadow hover:shadow-md transition hover:bg-gray-200"
                  >
                    {issue.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Pull Requests Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800">Pull Requests</h2>
            <ul className="mt-4 space-y-3">
              {pullRequests.slice(0, 5).map((pr) => (
                <li key={pr.id}>
                  <a
                    href={pr.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-800 bg-gray-100 px-4 py-3 rounded-lg shadow hover:shadow-md transition hover:bg-gray-200"
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
              className="bg-indigo-500 text-white px-8 py-3 rounded-lg shadow hover:bg-indigo-600 transition duration-300"
            >
              Visit Repository
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  
  