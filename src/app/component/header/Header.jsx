'use client'
import style from "./Header.module.css";
import { FaMicrophone, FaRegCircleUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowForward, IoIosHelpCircleOutline, IoIosNotificationsOutline } from "react-icons/io";
import { GoMoon } from "react-icons/go";
import { IoEarthOutline, IoLanguageOutline, IoSettingsOutline } from "react-icons/io5";
import { LuBadgeIndianRupee } from "react-icons/lu";
import { RiFeedbackLine, RiShieldUserLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { TbLivePhoto, TbLogout } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { HiMiniArrowLeft } from "react-icons/hi2";
import HeaderMobile from "./HeaderMobile";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { PiUserSwitch } from "react-icons/pi";
import { SiYoutubestudio } from "react-icons/si";
import { MdOutlineRemoveModerator } from "react-icons/md";
import Login from "./Login";
import CreateChannel from "../channel/CreateChannel";
import CreatePlaylist from "../channel/CreatePlaylist";
import CreateVideo from "../channel/CreateVideo";
function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-1 border-bottom shadow-sm fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-md-none d-block">
            <HeaderMobile />
          </div>
          <div className={` d-md-flex d-none justify-content-between align-items-center`} id="logoSearch">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <img className={`${style.logo} img-fluid`} src="/images/logo/mtube.png" alt="mtube" />
              <span className="ms-1">MTube</span>
            </a>
          </div>
          {/* Search Bar */}
          <form className={`d-md-flex d-none justify-content-center ${style.searchForm}`}>
            <input
              className={` p-2 border rounded-pill rounded-end ${style.searchInput}`}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className={`p-2 border rounded-pill rounded-start ${style.searchButton}`} type="submit">
              <CiSearch className="fs-4 mx-2" />
            </button>
          </form>
          <button className="ms-2 p-2 d-md-flex d-none items-center justify-center border rounded-circle ">
            <FaMicrophone className="m-2" />
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse d-md-block d-none">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isAuthenticated ? (
                <>
                  {session?.user?.isChannel &&
                    <div className="dropdown">
                      <button className={` border rounded-pill p-2 dropdown-toggle `} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FiPlus className="fs-4" /><span className="fw-bold"> Create</span>
                      </button>
                      <ul className="dropdown-menu py-2">
                        <li>
                          <CreatePlaylist />
                        </li>
                        <li><CreateVideo /></li>
                        <li><a className="dropdown-item flex items-center px-4 py-2 " href="#"><TbLivePhoto /> <span className="ms-2">Go live</span></a></li>
                        <li><a className="dropdown-item flex items-center px-4 py-2 " href="#"><FaRegEdit /><span className="ms-2">Create post</span></a></li>
                      </ul>
                    </div>
                  }
                  <div className="dropdown ">
                    <button className={`ms-2 border-0  bg-transparent border-transparent rounded-pill p-2 dropdown-toggle ${style.hoverButton}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <IoIosNotificationsOutline className="fs-4 fw-bold" />
                    </button>
                    <div className="dropdown-menu  dropdown-menu-end dropdown-menu-lg-end p-4 text-body-secondary">
                      <p>
                        Some example text that's free-flowing within the dropdown menu.
                      </p>
                      <p className="mb-0">
                        And this is more example text.
                      </p>
                    </div>
                  </div>
                  <div className="dropdown dropstart">
                    <button className={`ms-2 border-0 bg-transparent text-white rounded-pill p-2 dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {/* <CiUser className="fs-4 fw-bold"/> */}
                      {session?.user?.image === '' ? (
                        <img className={`${style.profileImage} rounded-circle`} src={'/images/logo/Default.png'} alt="profile" />
                      ) : (
                        <img className={`${style.profileImage} rounded-circle`} src={session?.user?.image} alt="profile" />
                      )}
                      {/* <img className="" src="" alt="profile" /> */}
                    </button>
                    <div className="dropdown-menu dropdown-menu-end  dropdown-menu-lg-end text-body-secondary mt-3 border-0 rounded-4" style={{ height: "95vh", width: "20vw", marginRight: '-1vw' }}>
                      <div className="d-flex p-3">
                        {session?.user?.image === '' ? (
                          <img className={`${style.profileImageView} rounded-circle`} src={'/images/logo/Default.png'} alt="profile" />
                        ) : (
                          <img className={`${style.profileImageView} rounded-circle`} src={session?.user?.image} alt="profile" />
                        )}
                        <div className="ms-3">
                          <span className="text-dark w-100 d-block fw-semibold">{session?.user?.name}</span>
                          <span className="text-dark w-100 fw-semibold">@{session?.user?.username}</span>
                          <div>{session?.user?.isChannel === true ? <Link href={`/`} className=" nav-link text-primary">View your channel</Link> : <CreateChannel />
                          }
                          </div>
                        </div>
                      </div>
                      <hr className="my-2" />
                      <div className="list-group  " style={{ maxHeight: "80vh", overflowY: "auto" }}>
                        <Link href="/" className="list-group-item list-group-item-action text-dark removeBorder"
                        >
                          <span><FaGoogle className="fs-5 me-3" /> Google Account</span>
                        </Link>

                        <Link href="/" className="list-group-item list-group-item-action text-dark d-flex justify-content-between align-items-center removeBorder"><span><PiUserSwitch className="fs-5 me-3" />Switch account</span><IoIosArrowForward /> </Link>
                        <button className="list-group-item list-group-item-action text-dark removeBorder" onClick={handleLogout}><span><TbLogout className="fs-5 me-3" />Sing out</span></button>
                        <hr className="my-2" />
                        <Link href="/" className="list-group-item list-group-item-action text-dark removeBorder"
                        ><span><SiYoutubestudio className="fs-5 me-3" /> YouTube Studio</span>
                        </Link>
                        <Link href="/" className="list-group-item list-group-item-action text-dark  removeBorder"
                        ><span><LuBadgeIndianRupee className="fs-5 me-3" /> Purchases and memberships</span>
                        </Link>
                        <hr className="my-2" />
                        <Link href="/" className="list-group-item list-group-item-action text-dark  removeBorder"
                        ><span><RiShieldUserLine className="fs-5 me-3" /> Your data in YouTube</span></Link>

                        <Link href="/" className="list-group-item list-group-item-action text-dark d-flex justify-content-between align-items-center removeBorder"
                        ><span><GoMoon className="fs-5 me-3" /> Apperances: Device Theme</span><IoIosArrowForward /></Link>

                        <Link href="/" className="list-group-item list-group-item-action text-dark d-flex justify-content-between align-items-center removeBorder"
                        ><span><IoLanguageOutline className="fs-5 me-3" /> Languages: English</span><IoIosArrowForward /></Link>

                        <Link href="/" className="list-group-item list-group-item-action text-dark d-flex justify-content-between align-items-center removeBorder"
                        ><span><MdOutlineRemoveModerator className="fs-5 me-3" /> Restricted Mode: Off</span><IoIosArrowForward /></Link>

                        <Link href="/" className="list-group-item list-group-item-action text-dark d-flex justify-content-between align-items-center removeBorder"
                        ><span><IoEarthOutline className="fs-5 me-3" /> Location: India</span><IoIosArrowForward /></Link>

                        <Link href="/" className="list-group-item list-group-item-action text-dark removeBorder"
                        ><span><IoEarthOutline className="fs-5 me-3" /> Keyboard: shortcuts</span></Link>
                        <hr className="my-2" />
                        <Link href="/" className="list-group-item list-group-item-action text-dark removeBorder"
                        ><span><IoSettingsOutline className="fs-5 me-3" /> Setting</span></Link>
                        <Link href="/" className="list-group-item list-group-item-action text-dark removeBorder"
                        ><span><IoIosHelpCircleOutline className="fs-5 me-3" /> Help</span></Link>
                        <Link href="/" className="list-group-item list-group-item-action text-dark removeBorder"
                        ><span><RiFeedbackLine className="fs-5 me-3" /> Send feedback</span></Link>

                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Login />
              )}
            </ul>
          </div>
        </div>
      </nav >
      <div className="d-md-block d-none" style={{ height: "12vh" }}></div>
      <div className="d-md-none d-block" style={{ height: "8vh" }}></div>
    </>
  );
}

export default Header;
