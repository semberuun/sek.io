import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Topbar from "../Components/Topbar";
import SigninPage from "./SigninPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import BottomBar from '../Components/BottomBar';
import CategoryPage from "./CategoryPage";
import TestingPage from "./TestingPage";
import FirstSafetyPage from "./FirstSafetyPage";
import AdminPage from './AdminPage';
import AddSafetyPage from '../Pages/AddSafetyPage';
import PdfViewerPage from "./PdfViewerPage";
import LessonPage from "./LessonPage";

import UserContext from "../Context/UserContext";
import { NewsStore } from "../Context/NewsContext";
import { CategoryStore } from "../Context/CategoryContext";
import { AdminStore } from "../Context/AdminContext";
import { FirstSafetyStore } from "../Context/FirstSafetyContext";
import { AddSafetyStore } from "../Context/AddSafetyContext";
import { LessonStore } from "../Context/LessonContext";

export default function App() {

  useEffect(() => {
    RefreshFunc.current();
    return () => {
      //Цэвэрлэгч функц

    };
  }, []);

  const ctx = useContext(UserContext);
  const RefreshFunc = useRef();

  const refFunc = () => {
    const token = localStorage.getItem('token');
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    if (token) {
      ctx.refreshUser(config);
    } else {
      console.log('hereglegch nevtreegui bn');
    }
  };

  RefreshFunc.current = refFunc;

  return (
    <div className=" container">
      <Topbar />
      <Navbar />
      <Routes>
        <Route path='/' element={
          <NewsStore>
            <HomePage />
          </NewsStore>
        } />
        <Route path="/admin" element={
          <AdminStore>
            <AdminPage />
          </AdminStore>
        } />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/categories/:id" element={
          <LessonStore>
            <LessonPage />
          </LessonStore>
        } />
        <Route path="/categories" element={
          <CategoryStore>
            <CategoryPage />
          </CategoryStore>
        } />
        <Route path="/test" element={<TestingPage />} />
        <Route path="/firstsafety/:id" element={<PdfViewerPage />} />
        <Route path="/firstsafety/addsafety" element={
          <AddSafetyStore>
            <AddSafetyPage />
          </AddSafetyStore>
        } />
        <Route path="/firstsafety" element={
          <FirstSafetyStore>
            <FirstSafetyPage />
          </FirstSafetyStore>
        } />
      </Routes>
      <BottomBar />
    </div>
  );
}

