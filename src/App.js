// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import AddLinkComponent from './components/AddLinkComponent';
import ManageComponent from './components/ManageComponent';
import EditLinkComponent from './components/EditLinkComponent';
import instagramIcon from './assets/instagram.png';
import facebookIcon from './assets/facebook.png';
import linkedinIcon from './assets/linkedin.png';
import pinterestIcon from './assets/pinterest.png';
import snapchatIcon from './assets/snapchat.png';
import telegramIcon from './assets/telegram.png';
import twitterIcon from './assets/twitter.png';
import videoIcon from './assets/video.png';
import moreIcon from './assets/more.png';

const platformOptions = [
    { name: 'Instagram', icon: instagramIcon },
    { name: 'Facebook', icon: facebookIcon },
    { name: 'LinkedIn', icon: linkedinIcon },
    { name: 'Pinterest', icon: pinterestIcon },
    { name: 'Snapchat', icon: snapchatIcon },
    { name: 'Telegram', icon: telegramIcon },
    { name: 'Twitter', icon: twitterIcon },
    { name: 'Video', icon: videoIcon },
];

const App = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await axios.get('https://bixcard-backend.onrender.com/links');
                const data = response.data.social_media_links;
                const linksArray = Object.keys(data).map(platform => ({
                    platform,
                    link: data[platform]
                }));
                setLinks(linksArray);
            } catch (error) {
                console.error("Error fetching links: ", error);
            }
        };

        fetchLinks();
    }, []);

    const addLink = async (newLink) => {
        try {
            await axios.post('https://bixcard-backend.onrender.com/links', newLink);
            setLinks([...links, newLink]);
        } catch (error) {
            console.error("Error adding link: ", error);
        }
    };

    const updateLink = async (updatedLink) => {
        setLinks(links.map(link => (link.platform === updatedLink.platform ? updatedLink : link)));
    };

    return (
        <Router>
            <div className="App">
                {/* <header className="App-header">
                    <h1>My Social Links</h1>
                </header> */}
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home links={links} platformOptions={platformOptions} />}
                        />
                        <Route
                            path="/add-link"
                            element={<AddLinkComponent onAddLink={addLink} />}
                        />
                        <Route
                            path="/manage"
                            element={<ManageComponent links={links} platformOptions={platformOptions} />}
                        />
                        <Route
                            path="/edit-link/:platform"
                            element={<EditLinkComponent platformOptions={platformOptions} onUpdateLink={updateLink} />}
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

const Home = ({ links, platformOptions }) => {
    return (
      <div className="home">
      <div className="links-list">
          {links.map((link, index) => (
              <div key={index} className="link-item">
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                      <img
                          src={platformOptions.find(option => option.name.toLowerCase() === link.platform.toLowerCase())?.icon}
                          alt={link.platform}
                      />
                  </a>
              </div>
          ))}
          <div className="link-item">
              <Link to="/add-link">
                  <img src={moreIcon} alt="Add Link" />
              </Link>
          </div>
      </div>
      <Link to="/manage" className="manage-button">Manage</Link>
  </div>
    );
};

export default App;
