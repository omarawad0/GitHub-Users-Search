import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import UserResults from "./UserResults";
import LatestRepo from "./LatestRepo";

const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState();
  const [repos, setRepos] = useState([]);
  const [latestRepo, setLatestRepo] = useState([]);
  const fetchTerm = async () => {
    const { data } = await axios.get(`https://api.github.com/users/${term}`);
    setResults(data);
    const { data: repoData } = await axios.get(
      `https://api.github.com/users/${term}/repos`
    );
    setRepos(repoData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (term) {
      fetchTerm();
    }
  };

  useEffect(() => {
    if (repos[0]) {
      getLatestRepo();
    } else {
      setLatestRepo([]);
    }
  }, [repos]);
  const getLatestRepo = () => {
    let latestRepo = repos.reduce(function (prev, current) {
      return new Date(prev.created_at) > new Date(current.created_at)
        ? prev
        : current;
    });

    setLatestRepo(latestRepo);
  };

  return (
    <div>
      <div className="wrapper">
        <form className="ui form">
          <div className="field">
            <h3>Search Github Users</h3>
            <label>Enter username to fetch a user profile info and repos</label>
            <input
              className="input"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <button className="ui button" onClick={onSubmit}>
            Submit
          </button>
        </form>
        {results && (
          <>
            <UserResults userResult={results} />
            <LatestRepo latestRepo={latestRepo} />
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
