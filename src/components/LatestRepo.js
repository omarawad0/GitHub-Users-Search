import React from "react";

const LatestRepo = ({ latestRepo: { name, watchers, forks } }) => {
  return (
    <div className="ui celled list" style={{ margin: "10px" }}>
      <h2>Latest repo</h2>
      <div className="item">
        <div className="flex2">
          <div className="content">
            <h2 className="header">{name}</h2>
          </div>

          <div className="flex">
            <div className="info_index gists">Watchers: {watchers}</div>
            <div className="info_index followers">Forks: {forks}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestRepo;
