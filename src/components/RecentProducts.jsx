import React from "react";

export default function RecentProducts({ lifoItems, handleClick }) {
  return (
    <aside className="single_sidebar_widget popular_post_widget">
      <h3 className="widget_title" style={{ color: "#2d2d2d" }}>
        Similar Products
      </h3>
      {lifoItems.map((post, index) => (
        <div
          className="media post_item"
          key={index}
          onClick={() => handleClick(post.id)}
        >
          <img
            src={post.image || post.imageUrls}
            alt={`post ${post.title}`}
            className="w-50"
          />
          <div className="media-body">
            <a href="#" onClick={() => handleClick(post.id)}>
              <h3 style={{ color: "#2d2d2d" }}>{post.title}</h3>
            </a>
            <p>{post.date}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}
