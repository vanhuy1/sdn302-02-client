import React, { useState } from 'react';
import { useGetUsersQuery } from './usersApiSlice';
import { useSelector } from 'react-redux';
import { selectUserIds, selectAllUsers } from './usersApiSlice';
import { Link } from 'react-router-dom'; // Import Link for routing

const UserList = () => {
    // State for search input
    const [searchTerm, setSearchTerm] = useState("");

    // State for filter (active, inactive, or all)
    const [filterStatus, setFilterStatus] = useState("all");

    // Fetch users using the query hook
    const {
        data: users, // Normalized data
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();

    const userIds = useSelector(selectUserIds); // Array of user IDs
    const allUsers = useSelector(selectAllUsers); // Full list of users

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Handle filter change for active/inactive/all users
    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isError) {
        content = <p>{error?.message || "Error fetching users."}</p>; // Improved error handling
    } else if (isSuccess && users) {
        // Filter users based on search term and active/inactive status
        const filteredUserIds = userIds.filter(userId => {
            const user = allUsers.find(u => u.id === userId);
            const matchesSearch = user &&
                (user.name.toLowerCase().includes(searchTerm) || user.username.toLowerCase().includes(searchTerm) || user.identifyNumber.includes(searchTerm));

            const matchesFilter = filterStatus === 'all' ||
                (filterStatus === 'active' && user.active) ||
                (filterStatus === 'inactive' && !user.active);

            return user && !user.roles.includes('Manager') && matchesSearch && matchesFilter;
        });

        content = (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={headerStyle}>Username</th>
                        <th style={headerStyle}>Name</th>
                        <th style={headerStyle}>Gender</th>
                        <th style={headerStyle}>Address</th>
                        <th style={headerStyle}>Birth Date</th>
                        <th style={headerStyle}>Phone Number</th>
                        <th style={headerStyle}>Service</th>
                        <th style={headerStyle}>Active</th>
                        <th style={headerStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUserIds.map(userId => {
                        const user = allUsers.find(u => u.id === userId);

                        return user ? (
                            <tr key={userId}>
                                <td style={cellStyle}>{user.username}</td>
                                <td style={cellStyle}>{user.name}</td>
                                <td style={cellStyle}>{user.gender}</td>
                                <td style={cellStyle}>{user.address}</td>
                                <td style={cellStyle}>{new Date(user.birthDay).toLocaleDateString()}</td>
                                <td style={cellStyle}>{user.phoneNumber}</td>
                                <td style={cellStyle}>
                                    {user.services && user.services.length > 0
                                        ? user.services.map(service => service.itemName).join(', ')
                                        : 'No services'}
                                </td>
                                <td style={cellStyle}>{user.active ? 'Active' : 'Inactive'}</td>
                                <td style={cellStyle}>
                                    <Link to={`/dash/manage/users/${userId}`} style={editButtonStyle}>Update</Link>
                                </td>
                            </tr>
                        ) : null;
                    })}
                </tbody>
            </table>
        );
    }

    return (
        <section style={sectionStyle}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Customer List</h2>

            {/* Search and Filter Inputs */}
            <div style={filterContainerStyle}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={searchInputStyle}
                />

                <select value={filterStatus} onChange={handleFilterChange} style={filterSelectStyle}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {content}
        </section>
    );
};

// Inline styles
const sectionStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginTop: '30px',
    marginBottom: '30px'
};

const headerStyle = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left',
    border: '1px solid #ddd',
};

const cellStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
    backgroundColor: '#fff',
};

const editButtonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    textDecoration: 'none',
};

const filterContainerStyle = {
    marginBottom: '20px',
    textAlign: 'center',
};

const searchInputStyle = {
    padding: '10px',
    width: '50%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
};

const filterSelectStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
};

export default UserList;
