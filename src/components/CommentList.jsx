import moment from "moment";
import React from "react";

export default function CommentList({ comment }) {
  return (
    <div class="comments-area">
      <h4>
        {comment && comment.length} Comment
        {+comment && comment.length > 0 ? "s" : ""}
      </h4>
      <div class="comment-list">
        {comment &&
          comment.map((comment, i) => {
            return (
              <div class="single-comment justify-content-between d-flex pt-8">
                <div class="user justify-content-between d-flex">
                  <div class="thumb">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD11rgdTM9nRXZsKKutRWeB5hPwoMPE1QsyQ&s"
                      alt=""
                    />
                  </div>
                  <div class="desc">
                    <div key={i}>
                      <p class="comment">{comment.comment}</p>
                      <div class="d-flex justify-content-between">
                        <div class="d-flex align-items-center">
                          <h5>
                            <a href="#">{comment.name}</a>
                          </h5>
                          <p class="date">
                            {moment(comment.date).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </p>
                        </div>
                        {/* <div class="reply-btn">
                        <a href="#" class="btn-reply text-uppercase">
                          reply
                        </a>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
