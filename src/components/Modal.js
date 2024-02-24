import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    borderRadius: "8px",
    height: "fit-content",
    padding: "32px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
};


const CreatePhotoModal = ({ setImages }) => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [form,setForm] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
    setName("");
    setForm(true);
    setFile("")
  }

  const handleChange = (event) => {
    setFile(event);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
    if(name === "" && file === ""){
      setForm(true);
    }
    else {
      setForm(false);
    }
  };

  const handleClick = () => {
    uploadImage(file);
    closeModal();
  };

  useEffect(() => {
    if (user) {
      getImages();
    }
  }, [user])

  async function getImages() {
    const { data, error } = await supabase
      .storage
      .from('images')
      .list(user?.id + "/", {
        limit: 100,
        offset: 0,
      })

    if (data !== null) {
      setImages(data)
    }
    else {
      console.log(error)
    }
  }

  async function uploadImage(ev) {
    let file = ev.target.files[0];

    const { data, error } = await supabase
      .storage
      .from('images')
      .upload(user.id + "/" + name, file)

    if (data) {
      getImages();
    }
    else {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "32px",
      }}
    >
      <button className="btn default" onClick={openModal}>
        Share a memory
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ margin: 0 }}>Share a memory</h2>
          <button onClick={closeModal} className="close">
            &times;
          </button>
        </div>

        <form style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <input type="file" onChange={e => handleChange(e)} />
          <p className="helper-text">
            <span>Format: JPEG. Size: Less than 50MB</span>
          </p>
          <label for="textInput">Describe the special moment</label>
          <textarea
            onChange={e => handleChangeName(e)}
            type="text"
            value={name}
            className="input-field"
            id="textInput"
          ></textarea>
          <p className="helper-text">
            <span>Max. characters: 200</span>
          </p>
          <button className="btn default" disabled={form} onClick={() => { handleClick() }}>
            Upload photo
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePhotoModal;
