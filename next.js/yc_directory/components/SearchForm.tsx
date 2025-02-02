import Form from "next/form";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
    return (
        <Form
            action="/"
            scroll={false}
            className="search-form"
        >
            <input
                name="query"
                type="text"
                className="search-input"
                placeholder="Search startups"
                defaultValue={query}
            />

            <div className="flex gap-2">
                {query && <SearchFormReset />}

                <button
                    type="submit"
                    className="search-btn text-white"
                >
                    S
                </button>
            </div>
        </Form>
    );
}

export default SearchForm
