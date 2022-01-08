import React from "react";
import { connect } from "react-redux";

const NewsFeed = ({ allPosts, userID }) => {
  return (
    <div className='newsfeed'>
      <h1>NewsFeed</h1>
      {allPosts && allPosts.length > 0 ? (
        <ul className='posts'>
          {allPosts.map((post) => (
            <li
              key={post._id}
              className={post.user === userID ? "my-post" : ""}
            >
              <h4>Owner: {post.user}</h4>
              <small>Add Date: {post.date}</small>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Post Found.</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allPosts: state.user.allPosts,
  userID: state.user.user._id,
});

export default connect(mapStateToProps, null)(NewsFeed);
