import { Form, Button, Alert } from 'react-bootstrap';

const AuthForm = ({
  title,
  fields,
  onSubmit,
  loading,
  submitText = 'Submit',
  footerText,
  footerLink,
  footerLinkText
}) => {
  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h2 className="text-center mb-4">{title}</h2>

      <Form onSubmit={onSubmit}>
        {fields.map((field) => (
          <Form.Group key={field.name} className="mb-3" controlId={`form${field.name}`}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={field.onChange}
              required={field.required}
            />
          </Form.Group>
        ))}

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? `${submitText}...` : submitText}
        </Button>
      </Form>

      {footerText && (
        <div className="mt-3 text-center">
          <p className="mb-0">
            {footerText} <a href={footerLink}>{footerLinkText}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;