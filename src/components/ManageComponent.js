import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/ManageComponent.css';

const ManageComponent = ({ links, platformOptions }) => {
    const navigate = useNavigate();

    const handleEdit = (platform) => {
        navigate(`/edit-link/${platform}`);
    };

    return (
        <div className="home">
            <div className="links-list">
                {links.map((link, index) => (
                    <div key={index} className="link-item" onClick={() => handleEdit(link.platform)}>
                        <img
                            src={platformOptions.find(option => option.name.toLowerCase() === link.platform.toLowerCase()).icon}
                            alt={link.platform}
                        />
                    </div>
                ))}
                {/* <div className="link-item">
                    <Link to="/add-link">
                        <img src={require('../assets/more.png').default} alt="Add Link" />
                    </Link>
                </div> */}
            </div>
            <Link to="/" className="manage-button"> <i class="fa-solid fa-left-long"></i> Back to Home</Link>
        </div>
    );
};

export default ManageComponent;
