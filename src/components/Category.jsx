import React, { useState } from "react";
import { categories } from "../mocks/mocks";

export default function Category({ setItem, setTag, currentProducts }) {
  const [activeCategory, setActiveCategory] = useState(null); // State to track active category

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
              className={`d-flex ${
                activeCategory === category.category ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                setItem(category.category);
                setTag(category.category);
                setActiveCategory(category.category); // Update the active category
              }}
              style={{
                color:
                  activeCategory === category.category ? "#ffffff" : "#2d2d2d",
                backgroundColor:
                  activeCategory === category.category
                    ? "#65867c"
                    : "transparent",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  marginRight: "auto",
                  color:
                    activeCategory === category.category
                      ? "#ffffff"
                      : "#2d2d2d",
                }}
              >
                <p
                  style={{
                    color:
                      activeCategory === category.category
                        ? "#ffffff"
                        : "#2d2d2d",
                  }}
                >
                  {category.category}
                </p>
              </div>
              <div
                style={{
                  color:
                    activeCategory === category.category
                      ? "#ffffff"
                      : "#2d2d2d",
                }}
              >
                <p
                  style={{
                    color:
                      activeCategory === category.category
                        ? "#ffffff"
                        : "#2d2d2d",
                  }}
                >
                  ({category.count})
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
