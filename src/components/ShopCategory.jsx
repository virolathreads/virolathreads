import React from "react";

export default function ShopCategory({ setItem, setTag, currentProducts }) {
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
              className="d-flex justify-between"
              onClick={(e) => {
                e.preventDefault();
                handleTagClick(tagObj?.tag);
              }}
            >
              <p style={{ marginRight: "auto" }}>{tagObj?.tag.toUpperCase()}</p>
              <p>({tagObj.count})</p>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
