import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'; // Adjust import paths as necessary
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

const UserUpdate = () => {
    const { id } = useParams(); // Get the user ID from the URL parameters
    const navigate = useNavigate(); // Hook for navigation after updating
    const { data: user, isLoading, isError } = useGetUserByIdQuery(id); // Fetch user data
    const [updateUser] = useUpdateUserMutation(); // Hook for updating user
    const [deleteUser] = useDeleteUserMutation(); // Hook for deleting user

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        gender: 'Male', // Default value
        address: '',
        birthDay: '',
        identifyNumber: '',
        phoneNumber: '',
        roles: 'Customer', // Default value; can be changed based on user roles
        active: true
    });

    useEffect(() => {
        if (user) {
            // Populate form with user data if fetched successfully
            setFormData({
                username: user.username,
                name: user.name,
                gender: user.gender,
                address: user.address,
                birthDay: new Date(user.birthDay).toISOString().split('T')[0], // Format date for input
                identifyNumber: user.identifyNumber,
                phoneNumber: user.phoneNumber,
                roles: user.roles.join(', '), // Assuming roles is an array; join for display
                active: user.active
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to update this user?");
        if (!isConfirmed) return;

        try {
            await updateUser({ id, ...formData }).unwrap(); // Call the update mutation
            // Show success notification
            toast.success('User updated successfully!', {
                onClose: () => navigate('/dash/manage/users') // Navigate to user list after the toast closes
            });
        } catch (error) {
            console.error('Failed to update user:', error);
            toast.error('Failed to update user. Please try again.');
        }
    };

    const handleDelete = async (e) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (!isConfirmed) return;

        try {
            await deleteUser({ id }).unwrap(); // Call the delete mutation
            toast.success('User deleted successfully!', {
                onClose: () => navigate('/dash/manage/users') // Navigate to user list after the toast closes
            });
        } catch (error) {
            console.error('Failed to delete user:', error);
            toast.error('Failed to delete user. Please try again.');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching user data.</p>;

    return (
        <section style={sectionStyle}>
            <ToastContainer /> {/* Container to show the toast messages */}
            <h2 style={headerStyle}>{formData.username}</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={inputGroupStyle} hidden>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div style={inputGroupStyle}>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label>Birth Date:</label>
                    <input
                        type="date"
                        name="birthDay"
                        value={formData.birthDay}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label>Identify Number:</label>
                    <input
                        type="text"
                        name="identifyNumber"
                        value={formData.identifyNumber}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle} hidden>
                    <label>Roles:</label>
                    <input
                        type="text"
                        name="roles"
                        value={formData.roles}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label>Active:</label>
                    <input
                        type="checkbox"
                        name="active"
                        checked={formData.active}
                        onChange={() => setFormData((prevData) => ({
                            ...prevData,
                            active: !prevData.active
                        }))}
                        style={checkboxStyle}
                    />
                </div>
                <div style={buttonGroupStyle}>
                    <button type="submit" style={submitButtonStyle}>Update User</button>
                    <button type="button" onClick={handleDelete} style={deleteButtonStyle}>Delete User</button>
                </div>
            </form>
        </section>
    );
};

// Inline styles for the component
const sectionStyle = {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginTop: '30px'
};

const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '24px'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column'
};

const inputGroupStyle = {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
};

const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
};

const checkboxStyle = {
    width: '20px',
    height: '20px'
};

const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const submitButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
};

const deleteButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#FF4136',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
};

export default UserUpdate;
