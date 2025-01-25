export default function LanguageDropdown({ selectedLanguage, setSelectedLanguage }) {
  const languages = [
    "Assembly",
    "C",
    "C++",
    "C#",
    "Clojure",
    "Dart",
    "Elixir",
    "Go",
    "Haskell",
    "HTML",
    "Java",
    "JavaScript",
    "Kotlin",
    "Lua",
    "MATLAB",
    "Objective-C",
    "Perl",
    "PHP",
    "Python",
    "R",
    "Ruby",
    "Rust",
    "Scala",
    "Shell",
    "Swift",
    "TypeScript",
    "Visual Basic",
  ];

  return (
    <div className="relative w-full sm:w-64">
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="block w-full sm:w-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-800 bg-white"
      >
        <option value="" disabled>
          Select a Language
        </option>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
}