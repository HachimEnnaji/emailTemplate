import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function EmailTest() {
  const Url = "https://localhost:7257/Email/send";
  const [emailData, setEmailData] = useState({ to: "", subject: "", body: "" });
  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      if (response.ok) {
        const text = await response.text();
        if (text) {
          const data = JSON.parse(text);
          console.log(data);
        } else {
          console.log("Response was empty email sended successfully");
        }
      } else {
        console.log("Response was not ok", response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1>Email Test</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="to"
            placeholder="name@example.com"
            value={emailData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            placeholder="Ex: Call schedules"
            value={emailData.subject}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control
            as="textarea"
            name="body"
            placeholder="your mesage here"
            rows={6}
            value={emailData.message}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </>
  );
}

export default EmailTest;
