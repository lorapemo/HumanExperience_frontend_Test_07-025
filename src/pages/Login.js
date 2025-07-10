import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import AuthForm from '../components/AuthForm';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { postLogin, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postLogin({ email, password });
            navigate('/home');
        } catch {
            // Error is already handled in the hook
        }
    };

    const fields = [
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
                    <AuthForm
                        title="Login"
                        fields={fields}
                        onSubmit={handleSubmit}
                        loading={loading}
                        submitText="Login"
                        footerText="Don't have an account?"
                        footerLink="/register"
                        footerLinkText="Register"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;