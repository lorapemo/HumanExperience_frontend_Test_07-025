import React, { useEffect } from 'react';
import { Container, Accordion, Spinner, Alert, Badge, Button } from 'react-bootstrap';
import { useGetTask } from '../hook/useTask';
import { TaskModal } from '../components/TaskModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { getTask, deleteTask, loading, error, tasks, createTask, updateTask } = useGetTask();
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userId = useSelector((state) => state.auth.userId)
  useEffect(() => {
    getTask();
  }, [getTask]);

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" />
    </div>
  );

  if (error) return (
    <Container>
      <Alert variant="danger">
        Error loading tasks: {error}
      </Alert>
    </Container>
  );

  const handleCreateTask = async (taskData) => {
    try {
      await createTask({
        ...taskData,
        assignedUser: { id: taskData.assignedUser }
      });
      setShowModal(false);
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      if (isEditing) {
        await updateTask(currentTask.id, {
          ...taskData,
          assignedUser: { id: taskData.userId }
        });
      } else {
        await createTask({
          ...taskData,
          assignedUser: { id: taskData.userId }
        });
      }
      setShowModal(false);
      setIsEditing(false);
      setCurrentTask(null);
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>{`Your ID is ${userId}` }</h4>
        <h1>Your Tasks</h1>
        <Button
          variant="primary"
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setCurrentTask(null);
          }}
          disabled={loading}
        >
          Create Task
        </Button>
      </div>

      {tasks?.length > 0 ? (
        <Accordion defaultActiveKey="0">
          {tasks.map((task, index) => (
            <Accordion.Item key={task.id} eventKey={index.toString()}>
              <Accordion.Header>
                <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                  <div>
                    <span className="fw-bold me-2">{task.name}</span>
                    <Badge bg="info" className="me-2">
                      ID: {task.id}
                    </Badge>
                  </div>
                  {task.assignedUser && (
                    <Badge bg="secondary">
                      {task.assignedUser.name}
                    </Badge>
                  )}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="mb-3">
                  <h5>Description:</h5>
                  <p>{task.description || 'No description provided'}</p>
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-4">
          <p>No tasks found.</p>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setCurrentTask(null);
            }}
            disabled={loading}
          >
            Create Task
          </Button>
        </div>
      )}


      <TaskModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setIsEditing(false);
          setCurrentTask(null);
        }}
        handleSubmit={handleTaskSubmit}
        loading={loading}
        isEditing={isEditing}
        currentTask={currentTask}
      />
    </Container>
  );
};

export default Home;