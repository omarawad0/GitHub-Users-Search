import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './style.css';

const Search = () => {

    const [term, setTerm] = useState('omarawad0');
    const [results, setResults] = useState({});
    const [repos, setRepos] = useState([]);

    const fetchTerm = async () => {
        const { data } = await axios.get(`https://api.github.com/users/${term}`);
        setResults(data);
        const repoData = await axios.get(`https://api.github.com/users/${term}/repos`);
        setRepos(repoData);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        fetchTerm();
    }

    useEffect(() => {
        fetchTerm();
    }, [])


    let latestRepo = [];

    if(repos.data) {
        latestRepo = repos.data.reduce(function(prev, current) {
            return (new Date(prev.created_at) > new Date(current.created_at)) ? prev : current
        });
    }


    return (
        <div>
            <div className="ui form">
                <form onSubmit={onFormSubmit}  className="ui form">
                    <div className="field">
                        <h3>Search Github Users</h3>
                        <label>Enter username to fetch a user profile info and repos</label>
                        <input
                            className="input"
                            value={term}
                            onChange={e => setTerm(e.target.value)}
                    />
                    </div>
                </form>
                <div className="ui celled list flex">
                    <div style={{ width: '150px'}} className="margin-right">
                        <div className="ui small image">
                            <img src={results.avatar_url} alt="user"/>
                        </div>
                        <button className="fluid ui button">
                            <a href={results.html_url}>View Profile</a>
                        </button>
                    </div>

                    <div>
                        <div className="flex">
                            <div className="info_index public_repos">Public repos: {results.public_repos}</div>
                            <div className="info_index gists">Public Gists: {results.public_gists}</div>
                            <div className="info_index followers">Followers: {results.followers}</div>
                            <div className="info_index following">Following: {results.following}</div>
                        </div>

                        <div className="ui celled list" style={{margin: '10px'}}>
                            <div className="item">
                                <div className="content">
                                    <div className="header">Company: {results.company}</div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="content">
                                    <div className="header">Website/blog: {results.blog}</div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="content">
                                    <div className="header">Location: {results.location}</div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="content">
                                    <div className="header">Member Since: {results.created_at}</div>
                                </div>
                            </div>
                        </div>

                        
                    </div>

                </div>

                <div className="ui celled list" style={{margin: '10px'}}>
                    <h2>Latest repo</h2>
                    <div className="item">
                        <div className="flex2">
                            <div className="content">
                                <h2 className="header">{latestRepo.name}</h2>
                            </div>

                            <div className="flex">
                                    <div className="info_index gists">Watchers: {latestRepo.watchers}</div>
                                    <div className="info_index followers">Forks: {latestRepo.forks}</div>
                                </div>
                        </div>
                    </div>
                    

                </div>
                
            </div>
        </div>
    )
}

export default Search;