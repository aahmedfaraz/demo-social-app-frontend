import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addPost,
  updatePost,
  deletePost,
  setCurrent,
} from "../../actions/userDataActions";

const Timeline = ({ current, userPosts }) => {
  const [body, setBody] = useState("");

  return (
    <div className='timeline'>
      <form action=''>
        <h2>{!current ? "Add" : "Update"} Your Post</h2>
        <div className='form-control'>
          <label htmlFor='body'>
            {!current ? "Enter New" : "Edit Your"} Post
          </label>
          <input
            type='text'
            name='body'
            value={body}
            onChange={(e) => setBody(e.value)}
            placeholder='Enter Post Here'
          />
        </div>
        <div className='controls'>
          {!current ? (
            <input
              type='submit'
              value='Add'
              className='btn add'
              onClick={(e) => {
                e.preventDefault();
                if (body === "") {
                  return alert("Enter some text inside body");
                }
                addPost({
                  body,
                });
              }}
            />
          ) : (
            <>
              <button
                className='btn update'
                onClick={() => {
                  if (body === "") {
                    return alert("Enter some text inside body");
                  }
                  updatePost({
                    body,
                  });
                }}
              >
                Update
              </button>
              <button
                className='btn cancel'
                onClick={() => {
                  setCurrent(null);
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
      <h1>My Posts</h1>
      {userPosts && userPosts.length > 0 ? (
        <ul className='posts'>
          {userPosts.map((post) => (
            <li key={post._id}>
              <small>Add Date: {post.date}</small>
              <p>{post.body}</p>
              <div className='controls'>
                <button
                  className='btn update'
                  onClick={() => {
                    setCurrent({
                      body,
                    });
                  }}
                >
                  Update
                </button>
                <button
                  className='btn delete'
                  onClick={() => {
                    deletePost(post._id);
                  }}
                >
                  Delete
                </button>
              </div>
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
  current: state.user.current,
  userPosts: state.user.userPosts,
});

export default connect(mapStateToProps, null)(Timeline);
