function SearchResults() {
  return (
    <section className="bg-purple-600 shadow-lg p-2 rounded border-x-2 border-black">
      <header className="mb-1">
        <h2 className="text-white font-bold">Results</h2>
      </header>
      <div>
        <ul>
          <li className="flex justify-between items-center border-b py-2">
            <div className="min-w-64">
              <div className="text-white font-bold">Good Day</div>
              <div className="flex gap-1 text-sm text-gray-700">
                <span>IU</span>
                <span>|</span>
                <span>REAL</span>
              </div>
            </div>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="size-4 stroke-white"
              strokeWidth="1.5"
            >
              <path
                d="M12 4.5v15m7.5-7.5h-15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default SearchResults;
