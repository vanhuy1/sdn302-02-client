// components/ServiceItem.js
import React from 'react';

const ServiceItem = ({ imageUrl, mainText, secondaryText }) => {
    return (
        <div style={styles.serviceItem}>
            <img src={imageUrl} alt={mainText} style={styles.image} />
            <div style={styles.textContainer}>
                <h3 style={styles.mainText}>{mainText}</h3>
                <p style={styles.secondaryText}>{secondaryText}</p>
            </div>
        </div>
    );
};

const styles = {
    serviceItem: {
        padding: '10px',
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: '40%',
        height: 'auto',
        borderRadius: '10px',
        marginBottom: '10px',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    mainText: {
        margin: '5px 0',
        fontSize: '18px',
    },
    secondaryText: {
        margin: '5px 0',
        fontSize: '14px',
        color: '#555',
    },
};

export default ServiceItem;
