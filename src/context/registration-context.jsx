import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs, and } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./auth-context";

// Create the context
const RegistrationsContext = createContext();

// Create a custom hook to use the RegistrationsContext
export const useRegistrations = () => useContext(RegistrationsContext);

// Create the provider component
export const RegistrationsProvider = ({ children }) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const registrationsCollectionRef = collection(db, "registrations");
        const registrationsQuery = query(
          registrationsCollectionRef,
          where("studentId", "==", currentUser.uid)
        );
       
        const querySnapshot = await getDocs(registrationsQuery);

        const registrationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRegistrations(registrationsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        setRegistrations([])
      }
    };

    currentUser && fetchRegistrations();
  }, []);

  return (
    <RegistrationsContext.Provider value={{ registrations, loading }}>
      {children}
    </RegistrationsContext.Provider>
  );
};
