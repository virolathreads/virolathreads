import React, { useState } from "react";

export default function ShopCategory({ setItem, setTag, currentProducts }) {
  const [activeTag, setActiveTag] = useState(null); // State to track active tag

  // Extract and count tags
  const tagCount =
    currentProducts &&
    currentProducts.reduce((acc, item) => {
      item.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1; // Increment count or initialize to 1
      });
      return acc;
    }, {});

  // Sort tags by count in descending order
  const sortedTags = Object.entries(tagCount || {})
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  // Handle tag selection
  const handleTagClick = (tag) => {
    setTag(tag); // Update the current selected tag
    setItem(tag);
    setActiveTag(tag); // Update the active tag
  };

  return (
    <aside className="single_sidebar_widget post_category_widget">
      <h4 className="widget_title" style={{ color: "#2d2d2d" }}>
        Category
      </h4>
      <ul className="list cat-list">
        {sortedTags.map((tagObj, index) => (
          <li key={index}>
            <a
              href="#"
              className={`d-flex justify-between ${
                activeTag === tagObj.tag ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleTagClick(tagObj?.tag);
              }}
              style={{
                color: activeTag === tagObj.tag ? "#fff" : "#2d2d2d",
                backgroundColor:
                  activeTag === tagObj.tag ? "#65867c" : "transparent",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              <p
                style={{
                  marginRight: "auto",
                  color: activeTag === tagObj.tag ? "#fff" : "#2d2d2d",
                }}
              >
                {tagObj?.tag.toUpperCase()}
              </p>
              <p style={{
          
                  color: activeTag === tagObj.tag ? "#fff" : "#2d2d2d",
                }}>({tagObj.count})</p>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
