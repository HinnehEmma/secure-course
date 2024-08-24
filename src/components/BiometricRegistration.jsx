import React, { useEffect, useState } from "react";
import faceIO from "@faceio/fiojs";
import { Button } from "./ui/button";
import { RotateCcw, ScanFace, ShieldPlus } from "lucide-react";
import { toast } from "sonner";
import Webcam from "react-webcam";
import { useRef } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const BiometricRegistration = ({ user }) => {
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);
  const [face, setFace] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (user.photoURL) {
      downloadProfileImage(user.photoURL);
    }
  }, [user.photoURL]);

  const downloadProfileImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      setProfileImage(blob);
    } catch (error) {
      console.error("Error downloading profile image:", error);
      toast.error("Failed to download profile image");
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    // setImageError("");
  };

  const verifyImage = async () => {
    if (!image || !profileImage) {
      toast.error("Both captured image and profile image are required");
      return;
    }

    const formData = new FormData();
    formData.append("other_face", await fetch(image).then((r) => r.blob()), "captured.jpg");
    formData.append("main_face", profileImage, "profile.jpg");

    try {
      const response = await fetch("http://localhost:8001/face/verify", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // toast.success("Verification completed successfully");

      // You can add more specific toasts based on the API response
      if (data.verified) {
        toast.success("Face verified successfully");
      } else {
        toast.error("Face verification failed");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      toast.error("Verification failed: " + error.message);
    }
  };

  return (
    <div>
      {/* BiometricRegistration */}
      {/* {JSON.stringify({ user })} */}
      <div className="flex flex-row gap-2 mt-5">
        <Button onClick={capture}>Capture Image</Button>
        {image && (
          <Button onClick={verifyImage}>
            <ScanFace className="mx-2" />
            Verify
          </Button>
        )}
      </div>
      <div className="flex flex-row gap-2 mt-5">
        <Webcam audio={false} ref={webcamRef} className="w-64 h-64" screenshotFormat="image/jpeg" />
        {image && <img src={image} className="w-64 h-64" alt="Captured" />}
      </div>
    </div>
  );
};

export default BiometricRegistration;
