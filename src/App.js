import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        // Store the username in session storage
        sessionStorage.setItem('username', 'smartcardai');

        const fetchLinks = async () => {
            const username = sessionStorage.getItem('username');
            try {
                const response = await axios.get(`https://bixcard-backend.onrender.com/links?user=${username}`);
                const data = response.data.social_media_links;
                const linksArray = Object.keys(data).map(platform => ({
                    platform,
                    link: data[platform]
                }));
                setLinks(linksArray);
            } catch (error) {
                console.error("Error fetching links: ", error);
                toast.error('Failed to fetch links');
            }
        };

        fetchLinks();
    }, []);

    const addLink = async (newLink) => {
        const username = sessionStorage.getItem('username');
        try {
            await axios.post(`https://bixcard-backend.onrender.com/links?user=${username}`, newLink);
            setLinks([...links, newLink]);
            toast.success('Link added successfully');
        } catch (error) {
            console.error("Error adding link: ", error);
            toast.error('Failed to add link');
        }
    };

    const updateLink = async (updatedLink) => {
        const username = sessionStorage.getItem('username');
        try {
            await axios.put(`https://bixcard-backend.onrender.com/links/${updatedLink.platform}?user=${username}`, updatedLink);
            setLinks(links.map(link => (link.platform === updatedLink.platform ? updatedLink : link)));
            toast.success('Link updated successfully');
        } catch (error) {
            console.error("Error updating link: ", error);
            toast.error('Failed to update link');
        }
    };

    return (
        <Router>
            <div className="App">
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
                <ToastContainer position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </div>
        </Router>
    );
};

const Home = ({ links, platformOptions }) => {
    return (
        <>
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
            </div>
            <div className="manage-button-container">
                <Link to="/manage" className="manage-button">Manage</Link>
            </div>
        </>
    );
};

export default App;
