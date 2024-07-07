// EditLinkComponent.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/EditLinkComponent.css';

const EditLinkComponent = ({ platformOptions }) => {
    const { platform } = useParams();
    const [link, setLink] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const response = await axios.get(`https://bixcard-backend.onrender.com/links/${platform}`);
                setLink(response.data.link);
            } catch (error) {
                console.error('Error fetching link:', error.message);
            }
        };

        fetchLink();
    }, [platform]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://bixcard-backend.onrender.com/update-link`, {
                platform,
                link: link.trim()
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating link:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://bixcard-backend.onrender.com/delete-link/${platform}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting link:', error.message);
        }
    };

    return (
        <div className="edit-link-container">
            <div className="icon-preview">
                <img
                    src={platformOptions.find(option => option.name.toLowerCase() === platform.toLowerCase())?.icon}
                    alt={platform}
                />
            </div>
            
            <form onSubmit={handleUpdate}>
                <div>
                    <label id="label" htmlFor="link">Link:</label>
                    <input className='linkss'
                        type="text"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Update</button>
                    <button type="button" onClick={handleDelete}>Delete</button>
                    <button type="button" onClick={() => navigate('/')}>Close</button>
                </div>
            </form>
        </div>
    );
};

export default EditLinkComponent;
