import React, { useState } from "react";
import { uploadValidCredentials, uploadFaceCapture } from "../../services/eKYC";
import useUser from "../../hooks/useAuth";
import Dashboard from "../Accounts/Dashboard";
import { FileInput, rem } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";

const EKYC = () => {
  const [docFile, setDocFile] = useState<File | null>(null);
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const session = useUser() as any;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await uploadValidCredentials(session.session.user.id, docFile);
      await uploadFaceCapture(session.session.user.id, faceImage);
      alert("eKYC process completed successfully!");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Dashboard>
      <div>
        <h1>eKYC Process</h1>
        <form onSubmit={handleSubmit}>
          <FileInput
            label="Upload your valid credentials"
            placeholder="Upload your valid credentials (passport)"
            accept="image/png,image/jpeg"
            onChange={setDocFile}
            required
            icon={<IconUpload size={rem(14)} />}
          />
          <FileInput
            label="Upload your face capture"
            accept="image/png,image/jpeg"
            onChange={setFaceImage}
            placeholder="Upload your face capture (selfie)"
            required
            icon={<IconUpload size={rem(14)} 
            />}
          />
        
          <input type="submit" value="Submit" />
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </Dashboard>
  );
};

export default EKYC;
