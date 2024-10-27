// components/TaskBar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faConciergeBell, faCog, faFileInvoice, faUser } from '@fortawesome/free-solid-svg-icons';

const TaskBar = () => {
    const [selectedTask, setSelectedTask] = useState(null);

    const tasks = [
        { name: 'Home', icon: faHome },
        { name: 'Booking', icon: faCalendarAlt },
        { name: 'Services', icon: faConciergeBell },
        { name: 'Manage', icon: faCog },
        { name: 'Bill', icon: faFileInvoice },
        { name: 'User', icon: faUser },
    ];

    const handleTaskClick = (taskName) => {
        setSelectedTask(taskName);
    };

    return (
        <div style={styles.taskBar}>
            {tasks.map((task, index) => (
                <div 
                    key={index} 
                    style={{
                        ...styles.taskItem,
                        backgroundColor: selectedTask === task.name ? 'lightblue' : 'transparent',
                    }} 
                    onClick={() => handleTaskClick(task.name)}
                >
                    <FontAwesomeIcon icon={task.icon} style={styles.icon} />
                    <span style={styles.taskName}>{task.name}</span>
                </div>
            ))}
        </div>
    );
};

const styles = {
    taskBar: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        width: '200px',
        borderRight: '1px solid #ccc',
    },
    taskItem: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px 0',
        cursor: 'pointer',
        padding: '5px', // Added some padding for better spacing
    },
    icon: {
        marginRight: '10px',
    },
    taskName: {
        fontSize: '16px',
    },
};

export default TaskBar;
