'use client'
import { useState } from 'react'
import style from "./Header.module.css";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa6";

function HeaderMobile() {
  const [isClick, setIsClick] = useState(false);

  const handleSearchClick = () => {
    setIsClick(true);
  };

  const handleArrowClick = () => {
    setIsClick(false);
  };

  return (
    <>
      <div className={` ${isClick ? 'd-none' : 'd-flex'} justify-content-between align-items-center`} id="logoSearch">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img className={`${style.logo} img-fluid`} src="/images/logo/mtube.png" alt="mtube" />
          <span className="ms-1">MTube</span>
        </a>
        <button className="ms-2 p-2 d-md-none d-flex btn border-none fs-4" onClick={handleSearchClick}>
          <CiSearch />
        </button>
      </div>

      <div className={` ${isClick ? 'd-flex' : 'd-none'} align-items-center justify-content-between`} id="searchMobile">
        {/* Left Arrow */}
        <HiMiniArrowLeft className="fs-4 text-secondary" onClick={handleArrowClick} />
        
        {/* Search Input and Button */}
        <div className="d-flex flex-grow-1 border p-1 rounded-pill mx-2">
          <input type="search" className={`${style.searchInput2} mx-2`} placeholder="Search MTube" />
          <button className={`${style.searchButton2} fs-5 me-2`}>
            <CiSearch />
          </button>
        </div>
        
        {/* Microphone Icon (visible on small screens) */}
        <button className="ms-2 d-md-none d-flex items-center justify-center border rounded-circle">
          <FaMicrophone className="m-2" />
        </button>
      </div>
    </>
  );
}

export default HeaderMobile;
