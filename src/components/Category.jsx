import React from "react";
import { categories } from "../mocks/mocks";

export default function Category({ setItem, setTag, currentProducts }) {
  console.log(currentProducts);

  const categoryCount =
    currentProducts &&
    currentProducts.reduce((acc, item) => {
      const { category } = item;
      acc[category] = (acc[category] || 0) + 1; // Increment the count or initialize to 1
      return acc;
    }, {});

  const sortedCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
    .map(([category, count]) => ({ category, count }));

  console.log(sortedCategories);

  return (
    <aside className="single_sidebar_widget post_category_widget">
      <h4 className="widget_title" style={{ color: "#2d2d2d" }}>
        Category
      </h4>
      <ul className="list cat-list">
        {sortedCategories.map((category, index) => (
          <li key={index}>
            <a
              href="#"
              className="d-flex"
              onClick={() => {
                setItem(category.category);
                setTag(category.category);
              }}
            >
              <p>{category.category}</p>
              <p>({category.count})</p>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
