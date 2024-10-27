// src/components/ServiceForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addService, updateService } from '../../../store/serviceSlice';

const ServiceForm = ({ onSubmit, editingService }) => {
    const dispatch = useDispatch();
    const [serviceData, setServiceData] = useState({ serviceName: '', description: '' });

    useEffect(() => {
        if (editingService) {
            setServiceData({
                serviceName: editingService.serviceName,
                description: editingService.description,
                price: 0,
            });
        } else {
            setServiceData({ serviceName: '', description: '', price: 0 });
        }
    }, [editingService]);

    const handleChange = (e) => {
        setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingService) {
            await dispatch(updateService({ _id: editingService._id, updatedData: serviceData }));
        } else {
            await dispatch(addService(serviceData));
        }
        onSubmit(); // Refresh the service list and reset form
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h3>{editingService ? 'Edit Service' : 'Add Service'}</h3>
            <input
                type="text"
                name="serviceName"
                value={serviceData.serviceName}
                onChange={handleChange}
                placeholder="Service Name"
                required
                style={inputStyle}
            />
            <textarea
                name="description"
                value={serviceData.description}
                onChange={handleChange}
                placeholder="Service Description"
                required
                style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
                {editingService ? 'Update' : 'Add'}
            </button>
        </form>
    );
};

// Styling
const formStyle = { marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' };
const inputStyle = { width: '100%', padding: '8px', margin: '5' };
const buttonStyle = { padding: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', margin: 10 };

export default ServiceForm;