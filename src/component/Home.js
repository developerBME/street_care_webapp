import React, { useState, useEffect, useRef } from "react";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

import FAQs from "./HomePage/FAQs";
import Eventcard from "./HomePage/Eventcard";
import BMEcard from "./HomePage/BMEcard";
import BMEcardnew from "./HomePage/BMEofficialCard";
import Landing from "./HomePage/Landing";
import Success from "./HomePage/Success";
import News from "./HomePage/News";
import Map from "./HomePage/Map";
import Process from "./HomePage/Process";
import MoreAboutUs from "./HomePage/MoreAboutUs";
import Navbar from "./Navbar";
import OutreachEventCard from "./Community/OutreachEventCard";
import { formatDate, fetchEvents, fetchOfficialEvents } from "./EventCardService";

import BMEcardimg1 from "../images/BMEofficialcardimg1.png";
import BMEcardimg2 from "../images/BMEofficialcardimg2.png";
import BMEcardimg3 from "../images/BMEofficialcardimg3.png";
import CustomButton from "../component/Buttons/CustomButton";
import { NewsCardData } from "../NewsData";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import PastOutreachEventCardSkeleton from "./Skeletons/PastOutreachEventCardSkeleton";

function HomePage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [docData, setDocData] = useState({ fname: '', lname: '', address: '' });

  useEffect(() => {
    const fAuth = getAuth();
    onAuthStateChanged(fAuth, (user) => {
      if (user) {
        console.log("User is signed in", user);
      } else {
        console.log("User is signed out");
      }
    });
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const querySnapshot = await getDocs(collection(db, "userDocuments"));
    const loadedDocuments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDocuments(loadedDocuments);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (selectedDocId) {
      await updateDoc(doc(db, "userDocuments", selectedDocId), docData);
    } else {
      const newDocRef = doc(collection(db, "userDocuments"));
      await setDoc(newDocRef, docData);
    }
    fetchDocuments();
    setDocData({ fname: '', lname: '', address: '' });
    setSelectedDocId(null);
  };

  const handleEdit = (id) => {
    setSelectedDocId(id);
    const foundDoc = documents.find(doc => doc.id === id);
    if (foundDoc) {
      setDocData({ fname: foundDoc.fname, lname: foundDoc.lname, address: foundDoc.address });
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "userDocuments", id));
    fetchDocuments();
    if (selectedDocId === id) {
      setDocData({ fname: '', lname: '', address: '' });
      setSelectedDocId(null);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <Navbar />
      <Landing />
      <div className="document-management-container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h1>Manage Documents</h1>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" name="fname" placeholder="First Name" value={docData.fname} onChange={handleInputChange} />
          <input type="text" name="lname" placeholder="Last Name" value={docData.lname} onChange={handleInputChange} />
          <input type="text" name="address" placeholder="Address" value={docData.address} onChange={handleInputChange} />
          <button type="submit">Save Document</button>
          {selectedDocId && <button onClick={() => setSelectedDocId(null)}>Cancel Edit</button>}
        </form>
        {documents.map(doc => (
          <div key={doc.id}>
            <div>{doc.fname} {doc.lname} - {doc.address}</div>
            <button onClick={() => handleEdit(doc.id)}>Edit</button>
            <button onClick={() => handleDelete(doc.id)}>Delete</button>
          </div>
        ))}
      </div>
      <Process />
      <Map />
      <MoreAboutUs />
      <FAQs />
      <Success />
    </div>
  );
}

export default HomePage;
