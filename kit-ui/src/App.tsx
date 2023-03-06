import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
// TODO how does Async ahead handle typing really fast
// does it wait a few milliseconds after the last typed char before submitting a request?

interface Kit {
  kit_id: number;
  label_id: string;
  shipping_tracking_code: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Kit[]>([]);
  const [selected, setSelected] = useState<Kit[]>([]);

  const handleSearch = (query: string) => {
    setIsLoading(true);

    // TODO: fix hard coded URL for prod and expanding to other routes
    fetch(`http://localhost:3001/api?kit_id=${query}`)
      .then((resp) => resp.json())
      .then(({ results }: { results: Kit[] }) => {
        setOptions(results);
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
          <AsyncTypeahead
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            labelKey="label_id"
            minLength={1}
            emptyLabel="No kits found"
            onSearch={handleSearch}
            options={options}
            onChange={setSelected as any} // TODO: the Kit type needs to extend typeaheads option
            selected={selected}
            placeholder="XX-XXX-XXXX"
            renderMenuItemChildren={(option: any) => (
              <>
                <span>{option.label_id}</span>
              </>
            )}
          />
        </div>
        <div>
          Unique Kit Identifier: {selected.length ? selected[0].label_id : ""}
        </div>
        <div>
          FedEx tracking number:{" "}
          {selected.length ? selected[0].shipping_tracking_code : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
