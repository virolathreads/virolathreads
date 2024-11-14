import React from "react";

export default function PreLoader() {
  return (
    <div id="preloader-active">
      <div class="preloader d-flex align-items-center justify-content-center">
        <div class="preloader-inner position-relative">
          <div class="preloader-circle"></div>
          <div class="preloader-img pere-text">
            <img src="https://res-console.cloudinary.com/dd0mdsb3h/media_explorer_thumbnails/264a416c430c2c1f3c94e36e220dd334/detailed" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
