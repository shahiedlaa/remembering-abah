import Header from "./components/Header";
import CreatePhotoModal from "./components/Modal";
import PhotoGallery from "./components/PhotoGallery";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Form, Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react";

function App() {

  const [email, setEmail] = useState();
  const user = useUser();
  const supabase = useSupabaseClient();
  const [images, setImages] = useState([]);

  async function magicLinkLogin() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email
    })
    if (error) {
      alert("Error communicating with Supabase, make sure to use real email address!");
      console.log(error);
    }
    else {
      alert("Check your email for link!")
    }
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }
  return (

    <div className="App main">
      {user === null ?

        <><Container align="center" className="container-sm mt-4">
          <>
            <h1>Welcome to 'Remembering Abah'</h1>
          </>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter an email to sign in with a Supabase Magic Link</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={() => magicLinkLogin()}>
              Get Magic Supabase Link
            </Button>
          </Form>
        </Container><><>
        </>

          </></>
        :
        <>
          <Header />
          <CreatePhotoModal setImages={setImages} />
          {images.length === 0 ?
            <><>
              <div className="emptyHolder">
                <h3>let's start posting our memories with Abah..</h3>
              </div>
            </></>:
            <PhotoGallery images={images} />
          }
          <div className="footer">
            <h5>User's Email: {user.email}</h5>
            <Button className="btn default signOut" onClick={() => signout()}>Sign Out</Button>
          </div>
        </>
      }
    </div>
  );
}

export default App;
