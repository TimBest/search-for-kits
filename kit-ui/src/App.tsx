import React, { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const SEARCH_URI = "https://api.github.com/search/users";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }: any) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Search for Kits
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="kitSearchInput" className="form-label">
            Kit Identifier
          </label>
          <input
            type="text"
            className="form-control"
            id="kitSearchInput"
            placeholder="XX-XXX-XXXX"
          />
        </div>
        <div className="mb-3">
          <AsyncTypeahead
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            labelKey="login"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for a Github user..."
            renderMenuItemChildren={(option: any) => (
              <>
                <img
                  alt={option.login}
                  src={option.avatar_url}
                  style={{
                    height: "24px",
                    marginRight: "10px",
                    width: "24px",
                  }}
                />
                <span>{option.login}</span>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
