// src/context/DataContext.jsx
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { DEFAULT_SITE_DATA, DEFAULT_ABOUT_DATA, DEFAULT_CURRICULUM_DATA } from './initialData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [curriculumData, setCurriculumData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Firestore References ---
  // Memoize refs so they don't trigger re-renders or exhaustive-deps warnings
  const siteDocRef = useMemo(() => doc(db, 'content', 'siteData'), []);
  const aboutDocRef = useMemo(() => doc(db, 'content', 'aboutData'), []);
  const curriculumDocRef = useMemo(() => doc(db, 'content', 'curriculumData'), []);

  // --- Load Data from Firestore on Mount ---
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load Site Data
        const siteSnap = await getDoc(siteDocRef);
        if (siteSnap.exists()) {
          setSiteData(siteSnap.data());
        } else {
          // Seed with default data if empty
          await setDoc(siteDocRef, DEFAULT_SITE_DATA);
          setSiteData(DEFAULT_SITE_DATA);
        }

        // Load About Data
        const aboutSnap = await getDoc(aboutDocRef);
        if (aboutSnap.exists()) {
          setAboutData(aboutSnap.data());
        } else {
          await setDoc(aboutDocRef, DEFAULT_ABOUT_DATA);
          setAboutData(DEFAULT_ABOUT_DATA);
        }

        // Load Curriculum Data
        const curSnap = await getDoc(curriculumDocRef);
        if (curSnap.exists()) {
          setCurriculumData(curSnap.data());
        } else {
          await setDoc(curriculumDocRef, DEFAULT_CURRICULUM_DATA);
          setCurriculumData(DEFAULT_CURRICULUM_DATA);
        }

      } catch (error) {
        console.error("Error loading Firestore data:", error);
        // Fallback to defaults on error
        setSiteData(DEFAULT_SITE_DATA);
        setAboutData(DEFAULT_ABOUT_DATA);
        setCurriculumData(DEFAULT_CURRICULUM_DATA);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Real-time listener for siteData (optional for live updates)
    const unsubscribeSite = onSnapshot(siteDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setSiteData(docSnap.data());
      }
    });

    const unsubscribeAbout = onSnapshot(aboutDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setAboutData(docSnap.data());
      }
    });

    const unsubscribeCurriculum = onSnapshot(curriculumDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setCurriculumData(docSnap.data());
      }
    });

    return () => {
      unsubscribeSite();
      unsubscribeAbout();
      unsubscribeCurriculum();
    };
  }, [siteDocRef, aboutDocRef, curriculumDocRef]);

  // --- Update Functions (Now write to Firestore) ---
  const updateHero = async (title, desc, images) => {
    try {
      const newData = { ...siteData, heroTitle: title, heroDesc: desc, heroImages: images };
      console.log("Saving to Firestore:", newData);
      await setDoc(siteDocRef, newData);
      console.log("Save successful!");
      // State will be updated by onSnapshot listener
    } catch (error) {
      console.error("Error saving hero data:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateAbout = async (nData) => {
    try {
      console.log("Saving About data to Firestore:", nData);
      await setDoc(aboutDocRef, nData);
      console.log("About save successful!");
    } catch (error) {
      console.error("Error saving about data:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateCurriculum = async (nData) => {
    try {
      console.log("Saving Curriculum data to Firestore:", nData);
      await setDoc(curriculumDocRef, nData);
      console.log("Curriculum save successful!");
    } catch (error) {
      console.error("Error saving curriculum data:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateLecturers = async (nLecturers) => {
    try {
      const newData = { ...siteData, lecturers: nLecturers };
      await setDoc(siteDocRef, newData);
      console.log("Lecturers save successful!");
    } catch (error) {
      console.error("Error saving lecturers:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updatePrograms = async (nPrograms) => {
    try {
      const newData = { ...siteData, programs: nPrograms };
      await setDoc(siteDocRef, newData);
      console.log("Programs save successful!");
    } catch (error) {
      console.error("Error saving programs:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateHomeSections = async (newSections) => {
    try {
      const updated = { ...siteData, ...newSections };
      console.log("Saving home sections to Firestore:", updated);
      await setDoc(siteDocRef, updated);
      console.log("Home sections save successful!");
    } catch (error) {
      console.error("Error saving home sections:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateNews = async (newsList) => {
    try {
      const newData = { ...siteData, news: newsList };
      await setDoc(siteDocRef, newData);
      console.log("News save successful!");
    } catch (error) {
      console.error("Error saving news:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateAgenda = async (agendaList) => {
    try {
      const newData = { ...siteData, agenda: agendaList };
      await setDoc(siteDocRef, newData);
      console.log("Agenda save successful!");
    } catch (error) {
      console.error("Error saving agenda:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateAcademicCalendar = async (calendarData) => {
    try {
      const newData = { ...siteData, academicCalendar: calendarData };
      await setDoc(siteDocRef, newData);
      console.log("Academic Calendar save successful!");
    } catch (error) {
      console.error("Error saving academic calendar:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateScholarship = async (scholarshipData) => {
    try {
      const newData = { ...siteData, scholarshipPage: scholarshipData };
      await setDoc(siteDocRef, newData);
      console.log("Scholarship data save successful!");
    } catch (error) {
      console.error("Error saving scholarship data:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  // Loading state before data is fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <DataContext.Provider value={{ siteData, updateHero, aboutData, updateAbout, curriculumData, updateCurriculum, updateLecturers, updatePrograms, updateHomeSections, updateNews, updateAgenda, updateAcademicCalendar, updateScholarship }}>
      {children}
    </DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext);