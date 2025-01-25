export default function Filters({ filters, setFilters }) {
  return (
    <div className="relative w-full sm:w-64">
      <select
        value={filters.label}
        onChange={(e) => setFilters({ label: e.target.value })}
        className="block w-full sm:w-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-800 bg-white"
      >
        <option value="any">Any</option>
        <option value="good-first-issue">Good First Issue</option>
        <option value="help-wanted">Help Wanted</option>
        <option value="bug">Bug</option>
        <option value="documentation">Documentation</option>
        <option value="enhancement">Enhancement</option>
        <option value="question">Question</option>
        <option value="wontfix">Won't Fix</option>
        <option value="duplicate">Duplicate</option>
        <option value="invalid">Invalid</option>
        <option value="discussion">Discussion</option>
      </select>
    </div>
  );
}