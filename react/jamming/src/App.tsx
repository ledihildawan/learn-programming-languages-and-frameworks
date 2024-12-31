import Playlist from "./Playlist"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

function App() {
  return (
    <>
      <nav className="bg-purple-950 text-center text-lg p-2">
        <a
          href="/"
          className="text-white font-bold text-xl"
        >
          Ja<span className="text-purple-800">mmm</span>ing
        </a>
      </nav>
      <main className="flex flex-col gap-4">
        <SearchBar />

        <div className="flex gap-4 justify-center mt-12">
          <SearchResults />
          <Playlist />
        </div>
      </main>
    </>
  )
}

export default App
