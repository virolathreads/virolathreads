import React from "react";

export default function RecentPost({ lifoItems, handleClick }) {
  console.log(lifoItems);
  return (
    <aside className="single_sidebar_widget popular_post_widget">
      <h3 className="widget_title" style={{ color: "#2d2d2d" }}>
        Recent Post
      </h3>
      {lifoItems.map((post, index) => (
        <div
          className="media post_item"
          key={index}
          onClick={() => handleClick(post.id)}
        >
          <img src={post.image} alt={`post ${post.title}`} className="w-50" />
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
