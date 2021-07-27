import React from "react";

const UserResults = ({
  userResult: {
    avatar_url,
    html_url,
    public_repos,
    public_gists,
    followers,
    following,
    company,
    blog,
    location,
    created_at,
  },
}) => {
  return (
    <div className="ui celled list flex results">
      <div style={{ width: "150px" }} className="margin-right">
        <div className="ui small image">
          <img src={avatar_url} alt="user" />
        </div>
        <button className="fluid ui button">
          <a href={html_url}>View Profile</a>
        </button>
      </div>

      <div>
        <div className="flex">
          <div className="info_index public_repos">
            Public repos: {public_repos}
          </div>
          <div className="info_index gists">Public Gists: {public_gists}</div>
          <div className="info_index followers">Followers: {followers}</div>
          <div className="info_index following">Following: {following}</div>
        </div>

        <div className="ui celled list" style={{ margin: "10px" }}>
          <div className="item">
            <div className="content">
              <div className="header">Company: {company}</div>
            </div>
          </div>
          <div className="item">
            <div className="content">
              <div className="header">Website/blog: {blog}</div>
            </div>
          </div>
          <div className="item">
            <div className="content">
              <div className="header">Location: {location}</div>
            </div>
          </div>
          <div className="item">
            <div className="content">
              <div className="header">Member Since: {created_at}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserResults;
