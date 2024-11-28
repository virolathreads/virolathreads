import React from "react";

export default function LatestBlog() {
  return (
    <div class="popular-product pt-50">
      {/* <h3>Latest Blog Posts</h3> */}
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="single-product mb-50">
              <div class="location-img">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/virola-blog.firebasestorage.app/o/blog%2F1euJftDFKYl8ucMUveWT%2FIMG_2832.PNG?alt=media&token=a306219f-cd05-45ee-a7d8-5320836238c6"
                  alt=""
                />
              </div>
              <div class="location-details">
                <p>
                  <a href="/blog/1euJftDFKYl8ucMUveWT">
                    WHAT TO EXPECT AT AFRICA FASHION WEEK NIGERIA
                  </a>
                </p>
                <a href="/blog/1euJftDFKYl8ucMUveWT" class="btn wow ">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="single-product mb-50">
              <div class="location-img">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/virola-blog.firebasestorage.app/o/blog%2FsdNkpYPS5ufzioNZwLKL%2FIMG_2837.PNG?alt=media&token=18a46a35-06f0-451a-81f5-bf941e88840e"
                  alt=""
                />
              </div>
              <div class="location-details">
                <p>
                  <a href="/blog/sdNkpYPS5ufzioNZwLKL">
                    The Impact of Fashion on Self-Expression
                    {/* <br />  */}
                  </a>
                </p>
                <a href="/blog/sdNkpYPS5ufzioNZwLKL" class="btn wow">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
