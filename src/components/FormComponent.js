import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instagramIcon from '../assets/instagram.png';
import facebookIcon from '../assets/facebook.png';
import linkedinIcon from '../assets/linkedin.png';
import pinterestIcon from '../assets/pinterest.png';
import snapchatIcon from '../assets/snapchat.png';
import telegramIcon from '../assets/telegram.png';
import twitterIcon from '../assets/twitter.png';
import videoIcon from '../assets/video.png';
import '../styles/FormComponent.css';

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

const FormComponent = ({ onAddLink }) => {
    const [link, setLink] = useState('');
    const [platform, setPlatform] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddLink({ link, platform });
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="link">Link:</label>
                <input type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="platform">Platform:</label>
                <select id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)} required>
                    <option value="" disabled>Select Platform</option>
                    {platformOptions.map((option) => (
                        <option key={option.name} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormComponent;
