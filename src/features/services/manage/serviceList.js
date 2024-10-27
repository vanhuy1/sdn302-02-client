import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const API_URL = 'https://sdn-hotel-api.onrender.com';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({ serviceName: '', description: '', price: 0, serviceItems: [] });
    const [itemData, setItemData] = useState({ itemName: '', cost: '', itemDescription: '' });
    const [editingItemIndex, setEditingItemIndex] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_URL}/services`);
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                setServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleEditService = (service) => {
        setEditingService(service);
        setFormData({
            serviceName: service.serviceName,
            description: service.description,
            serviceItems: service.serviceItems,
        });
    };

    const handleDeleteService = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                const response = await fetch(`${API_URL}/services/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete service');
                }
                setServices(services.filter(service => service._id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingService) {
                // Update existing service
                response = await fetch(`${API_URL}/services/${editingService._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                // Create new service
                response = await fetch(`${API_URL}/services`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            }

            if (!response.ok) {
                throw new Error(editingService ? 'Failed to update service' : 'Failed to create service');
            }

            const updatedService = await response.json();
            if (editingService) {
                setServices(services.map(service => (service._id === updatedService._id ? updatedService : service)));
            } else {
                setServices(prevServices => [...prevServices, updatedService]); // Add new service to the list
            }

            setEditingService(null);
            setFormData({ serviceName: '', description: '', price: 0, serviceItems: [] });

            window.location.reload();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: value,
        });
    };

    const handleAddOrEditItem = async (e) => {
        e.preventDefault();

        // Check if there is an editing service to associate the item with
        if (!editingService) {
            alert("Please select a service to edit before adding items.");
            return;
        }

        try {
            // If editing an existing item, update it locally without sending a new request
            if (editingItemIndex !== null) {
                const updatedItems = [...formData.serviceItems];
                updatedItems[editingItemIndex] = {
                    ...updatedItems[editingItemIndex],
                    itemName: itemData.itemName,
                    cost: Number(itemData.cost),
                    description: itemData.itemDescription,
                };
                setFormData({ ...formData, serviceItems: updatedItems });
                setEditingItemIndex(null);
            } else {
                // Otherwise, create a new service item via API call
                const response = await fetch(`${API_URL}/service/serviceItems`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        itemName: itemData.itemName,
                        cost: Number(itemData.cost),
                        description: itemData.itemDescription,
                        service: editingService._id, // Attach the service ID
                    }),
                });

                if (!response.ok) throw new Error('Failed to add service item');

                // Add the new service item to formData to display it immediately
                const newItem = await response.json();
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    serviceItems: [...prevFormData.serviceItems, newItem],
                }));

                window.location.reload();
            }

            // Reset item data form fields
            setItemData({ itemName: '', cost: '', itemDescription: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteItem = (index) => {
        const newItems = formData.serviceItems.filter((_, i) => i !== index);
        setFormData({ ...formData, serviceItems: newItems });
    };

    if (loading) return <p>Loading services...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={sectionStyle}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Service List</h2>
            <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
                <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                <input
                    type="text"
                    name="serviceName"
                    style={{ marginBottom: 10 }}
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    placeholder="Service Name"
                    required
                    className="form-control"
                />
                <input
                    type="text"
                    style={{ marginBottom: 10 }}
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description"
                    required
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary">
                    {editingService ? 'Update Service' : 'Add Service'}
                </button>
            </form>


            {editingService && (
                <div>
                    <h3>Service Items</h3>
                    <form onSubmit={handleAddOrEditItem} style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            name="itemName"
                            style={{ marginBottom: 10 }}
                            value={itemData.itemName}
                            onChange={handleItemChange}
                            placeholder="Item Name"
                            required
                            className="form-control"
                        />
                        <input
                            type="number"
                            style={{ marginBottom: 10 }}
                            name="cost"
                            value={itemData.cost}
                            onChange={handleItemChange}
                            placeholder="Cost"
                            required
                            className="form-control"
                        />
                        <input
                            type="text"
                            name="itemDescription"
                            style={{ marginBottom: 10 }}
                            value={itemData.itemDescription}
                            onChange={handleItemChange}
                            placeholder="Item Description"
                            required
                            className="form-control"
                        />
                        <button type="submit" className="btn btn-secondary">
                            {editingItemIndex !== null ? 'Update Item' : 'Add Item'}
                        </button>
                    </form>
                </div>
            )}


            {services.map(service => (
                <div key={service._id} style={serviceContainerStyle}>
                    <h3 style={{ color: '#4CAF50' }}>{service.serviceName}</h3>
                    <p>{service.description}</p>
                    {service.serviceItems.length > 0 ? (
                        <table style={tableStyle} className="table">
                            <thead>
                                <tr>
                                    <th style={headerStyle}>Item Name</th>
                                    <th style={headerStyle}>Cost</th>
                                    <th style={headerStyle}>Description</th>
                                    <th style={headerStyle}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {service.serviceItems.map((item, index) => (
                                    <tr key={item._id}>
                                        <td style={cellStyle}>{item.itemName}</td>
                                        <td style={cellStyle}>${item.cost}</td>
                                        <td style={cellStyle}>{item.description}</td>
                                        <td style={cellStyle}>
                                            <button onClick={() => handleDeleteItem(index)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No items available for this service.</p>
                    )}
                    <button onClick={() => handleEditService(service)} className="btn btn-warning me-2">Edit Service</button>
                    <button onClick={() => handleDeleteService(service._id)} className="btn btn-danger">Delete Service</button>
                </div>
            ))}
        </div>
    );
};

// Inline styles
const sectionStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
};

const serviceContainerStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
};

const tableStyle = {
    width: '100%',
    marginTop: '15px',
};

const headerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
};

const cellStyle = {
    padding: '10px',
};

export default ServiceList;