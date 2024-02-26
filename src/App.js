import Header from "./components/Header";
import CreatePhotoModal from "./components/Modal";
import PhotoGallery from "./components/PhotoGallery";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState();
  const user = useUser();
  const supabase = useSupabaseClient();
  const [images, setImages] = useState([]);

  async function magicLinkLogin() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });
    if (error) {
      alert(
        "Error communicating with Supabase. Make sure you are using an existing email address. Please try again."
      );
      console.log(error);
    } else {
      alert("Check your email inbox for magic log in link.");
    }
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }
  return (
    <div className="App main">
      {user === null ? (
        <>
          <Container align="center" className="container-sm mt-4">
            <>
              <h1>Welcome to 'Remembering Abah'</h1>
            </>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  To get started, enter your email address to receive a magic
                  link. You will be using the same email address each time you
                  wish to log in.
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" onClick={() => magicLinkLogin()}>
                Get magic link
              </Button>
            </Form>
          </Container>
          <>
            <></>
          </>
        </>
      ) : (
        <>
          <Header />
          <CreatePhotoModal setImages={setImages} />
          {images.length === 0 ? (
            <>
              <>
                <div className="emptyHolder">
                  <h3>Let's start posting memories with Abah...</h3>
                </div>
              </>
            </>
          ) : (
            <PhotoGallery images={images} />
          )}
          <div className="footer">
            <p>Logged in as {user.email}.</p>
            <span className="footer-span"></span>
            <button className="btn signOut" onClick={() => signout()}>
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
