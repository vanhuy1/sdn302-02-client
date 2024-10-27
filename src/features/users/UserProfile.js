import React, { useState } from 'react';

const UserProfile = () => {
    const [formData, setFormData] = useState({
        name: 'John Doe',
        username: 'johndoe123',
        gender: 'male',
        address: '123 Main St',
        birthday: '1990-01-01',
        identifyNumber: '123456789',
        phoneNumber: '555-1234',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile updated:', formData);
        // Handle form submission logic (e.g., send to API)
    };

    const styles = {
        container: {
            maxWidth: '500px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        select: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        button: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="name">Name</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="username">Username</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="gender">Gender</label>
                    <select
                        style={styles.select}
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="address">Address</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="birthday">Birthday</label>
                    <input
                        style={styles.input}
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="identifyNumber">Identify Number</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="identifyNumber"
                        name="identifyNumber"
                        value={formData.identifyNumber}
                        onChange={handleChange}
                        placeholder="Enter your identify number"
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="phoneNumber">Phone Number</label>
                    <input
                        style={styles.input}
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <button style={styles.button} type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfile;
