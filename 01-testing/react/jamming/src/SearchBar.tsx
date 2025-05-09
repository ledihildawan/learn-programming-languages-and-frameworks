import { useState } from "react";

function SearchBar() {
  const [keywords, setKeywords] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`you search ${keywords}`)
  };

  return (
    <form
      className="flex flex-col items-center gap-4 mt-8"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="keywords"
          className="sr-only"
        >Keywords</label>
        <input
          id="keywords"
          name="keywords"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
          className="p-2 rounded"
        />
      </div>

      <button className="uppercase rounded-full bg-purple-800 text-white px-4 py-2">Search</button>
    </form>
  )
}

export default SearchBar;
