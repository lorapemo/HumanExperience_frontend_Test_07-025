import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export const TaskModal = ({ 
  show, 
  handleClose, 
  handleSubmit, 
  loading, 
  isEditing, 
  currentTask 
}) => {
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        userId: ''
    });

    useEffect(() => {
        if (isEditing && currentTask) {
            setTaskData({
                name: currentTask.name || '',
                description: currentTask.description || '',
                userId: currentTask.assignedUser?.id || ''
            });
        } else {
            setTaskData({
                name: '',
                description: '',
                userId: ''
            });
        }
    }, [isEditing, currentTask, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = () => {
        handleSubmit(taskData);
        if (!isEditing) {
            setTaskData({ name: '', description: '', userId: '' });
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit Task' : 'Create New Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={taskData.name}
                            onChange={handleChange}
                            placeholder="Enter task name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={taskData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Enter description"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Assign To (User ID)</Form.Label>
                        <Form.Control
                            type="text"
                            name="userId"
                            value={taskData.userId}
                            onChange={handleChange}
                            placeholder="Enter user ID"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleFormSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        isEditing ? 'Updating...' : 'Creating...'
                    ) : (
                        isEditing ? 'Update Task' : 'Create Task'
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};