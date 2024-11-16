import React from "react";
import { categories } from "../mocks/mocks";

export default function Category({ setItem, setTag }) {
  return (
    <aside className="single_sidebar_widget post_category_widget">
      <h4 className="widget_title" style={{ color: "#2d2d2d" }}>
        Category
      </h4>
      <ul className="list cat-list">
        {categories.map((category, index) => (
          <li key={index}>
            <a
              href="#"
              className="d-flex"
              onClick={() => {
                setItem(category.name);
                setTag(category.name);
              }}
            >
              <p>{category.name}</p>
              <p>({Math.floor(Math.random() * 40)})</p>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
