import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/EditLinkComponent.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditLinkComponent = ({ platformOptions }) => {
    const { platform } = useParams();
    const [link, setLink] = useState('');
    const [formError, setFormError] = useState('');
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
        if (!isValidUrl(link)) {
            setFormError('Please enter a valid URL.');
            return;
        }
        try {
            await axios.post(`https://bixcard-backend.onrender.com/update-link`, {
                platform,
                link: link.trim()
            });

            alert('Link successfully updated!');

            navigate('/manage');
            toast.success('Link successfully updated!');
        } catch (error) {
            console.error('Error updating link:', error.message);
            toast.error('Failed to update link.');
        }

    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://bixcard-backend.onrender.com/delete-link/${platform}`);
            toast.success('Link successfully deleted!');
            alert('Link successfully deleted!');
            navigate('/manage');
        } catch (error) {
            console.error('Error deleting link:', error.message);
            toast.error('Failed to delete link.');
        }
    };

    const isValidUrl = (url) => {
        // URL validation
        return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    };

    return (

        <>
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
                        <input
                            type="text"
                            id="link-ed"
                            value={link}
                            onChange={(e) => {
                                setLink(e.target.value);
                                setFormError('');
                            }}
                            required
                        />
                        {formError && <p className="error-message">{formError}</p>}
                    </div>
                    <div className="button-containers">
                        <button id="up" type="submit">Update</button>
                        <button id="del" type="button" onClick={handleDelete}>Delete</button>
                        <button id="cl" type="button" onClick={() => navigate('/')}>Close</button>
                    </div>
                </form>

            </div>
            <ToastContainer position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </>
    );
};

export default EditLinkComponent;