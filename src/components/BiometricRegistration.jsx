import React, { useEffect, useState } from "react";
import faceIO from "@faceio/fiojs";
import { Button } from "./ui/button";
import { RotateCcw, ScanFace, ShieldPlus } from "lucide-react";
import { toast } from "sonner";
const BiometricRegistration = ({ user }) => {
  const [face, setFace] = useState(null);

  useEffect(() => {
    const initFace = async () => {
      try {
        const faceio = new faceIO("fioac11f");
        setFace(faceio);
        console.log(`FaceIo Loaded`);
      } catch (error) {
        console.log(`oops an error occured`);
        console.log(error);
      }
    };

    initFace();
  }, []);

  const handleEnroll = async () => {
    try {
      const response = await face.enroll({
        locale: "auto", // Default user locale
        userConsent: false,
        payload: {
          email: user?.email,
          id: user?.uid,
        },
      });
      console.log(response);
      toast.success("Biometric Registration Completed, Authenticate Now", { position: "top-center" });
    } catch (error) {
      toast.error("Oops,an error occured, refresh session", { position: "top-center" });
      console.error(error);
    }
  };

  const handleAuthenticate = () => {
    face
      .authenticate({
        locale: "auto",
      })
      .then((response) => {
        // your logic after enrollent goes here
        console.log(response);
        toast.success("Authentication Successfull", { position: "top-center" });
        // router.reload();
      })
      .catch((err) => {
        // your logic after error goes here
        console.log(err);
        toast.error("Oops,an error occured, refresh session", { position: "top-center" });

        // router.reload();
      });
  };

  const handleRefreshSession = () => {
    face.restartSession();
    toast.success("FaceID Authentication Refreshed", { position: "top-center" });
  };
  return (
    <div>
      {/* BiometricRegistration */}
      <div className="flex flex-row gap-2 mt-5">
        <Button onClick={handleEnroll}>
          <ShieldPlus className="mx-2" />
          Enroll
        </Button>
        <Button onClick={handleAuthenticate}>
          <ScanFace className="mx-2" />
          Authenticate
        </Button>
        <Button onClick={handleRefreshSession}>
          <RotateCcw className="mr-2" />
          Restart Session
        </Button>
      </div>
    </div>
  );
};

export default BiometricRegistration;
