
import React, { useRef, useState, useEffect, useContext } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

//Styling for the page
const containerStyle = {
    backgroundPosition:'center',
    backgroundSize:'cover',
    opacity: 1,
    height:'100%',
    position:'relative'
};
  
 

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth()

  

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      const userCredential = await login(emailRef.current.value, passwordRef.current.value); 
        // User login successful
        const user = userCredential.user;
        // Access the ID token
         const idToken = user && await user.getIdToken();
        // Store the ID token in local storage or state
        localStorage.setItem('firebaseIdToken', idToken);

      navigate("/");
    } catch {
      setError("Failed to log in")
    }
    await getUserDetails();
    setLoading(false);
  }

  const getUserDetails = async e => {
    try {

    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    
    <>
    <head><link href="client/src/assets/fontawesome-free-6.4.0-web/css/solid.css" rel="stylesheet"/></head>
      <div style={containerStyle}>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "85vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h1 className="centered" style={{ marginTop: '2rem', color: "#hhhh", fontFamily:'fantasy', padding:"2%", opacity:'100%', boxShadow:'0px 0px 5px', backgroundColor:'white' }}>CarCool</h1>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  <Button disabled={loading} className="w-100 mt-5" type="submit">
                    Log In
                  </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              </Card.Body>
              <div className="w-100 text-center  mb-2">
                Or create a new account <Link to="/signup">Sign Up</Link>
              </div>
            </Card>
          </div>
        </Container>
      </div>
   </>
  )
}







