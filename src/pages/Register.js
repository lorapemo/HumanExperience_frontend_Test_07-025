import { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hook/useAuth';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { postRegister, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postRegister({ name, email, password });
            navigate('/login');
        } catch {
            // Error is already handled in the hook
        }
    };

    const fields = [
        {
            name: 'name',
            label: 'Full Name',
            type: 'text',
            placeholder: 'Your name',
            onChange: (e) => setName(e.target.value),
            required: true
        },
        {
            name: 'email',
            label: 'Email address',
            type: 'email',
            placeholder: 'Email',
            onChange: (e) => setEmail(e.target.value),
            required: true
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Password',
            onChange: (e) => setPassword(e.target.value),
            required: true
        }
    ];

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
                    <AuthForm
                        title="Register"
                        fields={fields}
                        onSubmit={handleSubmit}
                        loading={loading}
                        submitText="Register"
                        footerText="Already have an account?"
                        footerLink="/login"
                        footerLinkText="Login"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Register;