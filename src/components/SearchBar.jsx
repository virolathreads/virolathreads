import React from "react";

function SearchBar({ setQuery }) {
  return (
    <aside className="single_sidebar_widget search_widget">
       <h4 className="widget_title" style={{ color: "#2d2d2d" }}>
        SEARCH
      </h4>
      <form action="#">
        <div className="form-group">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Keyword"
              onChange={(e) => setQuery(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Search Keyword")}
            />
            <div className="input-group-append">
              <button className="btns" type="button">
                <i className="ti-search"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </aside>
  );
}

export default SearchBar;
