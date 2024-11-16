import React from "react";

function IgFeeds() {
  return (
    <aside className="single_sidebar_widget instagram_feeds">
      <h4 className="widget_title" style={{ color: "#2d2d2d" }}>
        Instagram Feeds
      </h4>
      <ul className="instagram_row flex-wrap">
        
        {["5", "6", "7", "8", "9", "10"].map((post, index) => (
          <li key={index}>
            <a href="#">
              <img
                className="img-fluid"
                src={`assets/img/post/post_${post}.png`}
                alt=""
              />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default IgFeeds;
