import React, { useState } from 'react';
import { Button, Card, ListGroup, Alert } from 'react-bootstrap';

const ChosenList = ({ chosenServices, onRequestService }) => {
    const [isHovered, setIsHovered] = useState(false);

    const categorizedServices = chosenServices.reduce((acc, item) => {
        if (!acc[item.serviceId]) {
            acc[item.serviceId] = {
                serviceName: item.serviceName,
                items: []
            };
        }
        acc[item.serviceId].items.push(item);
        return acc;
    }, {});

    const totalCost = chosenServices.reduce((total, item) => total + item.cost, 0);

    return (
        <Card className="p-4">
            <Card.Header as="h3">Chosen Service Items</Card.Header>
            {Object.keys(categorizedServices).length > 0 ? (
                Object.entries(categorizedServices).map(([serviceId, service]) => (
                    <Card key={serviceId} className="mb-3">
                        <Card.Header as="h4">{service.serviceName}</Card.Header>
                        <ListGroup variant="flush">
                            {service.items.map(item => (
                                <ListGroup.Item key={item._id}>
                                    {item.itemName} - ${item.cost}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                ))
            ) : (
                <Alert variant="info">No service items chosen yet.</Alert>
            )}
            <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="font-weight-bold" style={{ fontSize: '1.2em' }}>Total: ${totalCost}</div>
                <Button
                    variant="primary"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={onRequestService}
                    style={{
                        backgroundColor: isHovered ? '#0056b3' : '#007bff',
                        transition: 'background-color 0.3s',
                    }}
                >
                    Request Service
                </Button>
            </div>
        </Card>
    );
};

export default ChosenList;
