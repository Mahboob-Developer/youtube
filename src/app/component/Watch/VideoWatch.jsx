import Link from 'next/link';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { AiOutlineLike,AiFillLike ,AiTwotoneDislike ,AiFillDislike  } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { MdContentCut } from "react-icons/md";
import { MdOutlineOutlinedFlag } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { HiDotsHorizontal,HiDotsVertical  } from "react-icons/hi";
import Comment from './Comment';
import Description from './Description';
import { FaRegFlag } from "react-icons/fa6";
import style from "./watch.module.css";
import style2 from "../categorySlider/CategorySlider.module.css";
import CommentMobile from './CommentMobile';



export default function VideoWatch({ video }) {
    return (
        <>
            <div>
                <video
                    id="my-video"
                    className={`${style.VideoWatch} border rounded video-js`}
                    controls
                    preload="auto"
                    poster="MY_VIDEO_POSTER.jpg"
                    data-setup="{}"
                >
                    <source src={video.videoUrl} type="video/mp4" />
                    <source src={video.videoUrl} type="video/webm" />
                </video>
                <p className='fs-4 fw-bold d-md-block d-none'>{video.title}</p>
                <p className=' fw-bold d-md-none d-block'>{video.title}</p>
                <div className="row">
                    <div className="col-md-6 row d-flex align-items-center">
                        <Link  href={`${video.channel}`} className={`col-3 ${style.authorProfile} `}>
                                <img className={`img-fluid  rounded-circle `} src={video.thumbnailUrl} alt={video.title}  />
                        </Link>
                        <div className="col-md-6 col-7">
                            {/* Desktop View */}
                            <span className="d-md-block d-flex flex-column">
                            <Link href={`/${video.channel}`} className="text-decoration-none text-dark fs-4 fw-bold">
                                {video.channel}
                            </Link>
                            <small className="text-muted d-block">13.2M subscribers</small>
                            </span>
                        </div>
                        <div className="col-md-3 col-2 d-flex justify-content-end">
                            <button className="d-md-block d-none btn btn-dark btn-md border rounded-pill">
                            Subscribe
                            </button>
                            <button className="d-md-none d-block btn btn-dark btn-sm border rounded-pill">
                            Subscribe
                            </button>
                        </div>
                    </div>

                    <div className="col-6  d-md-flex d-none justify-content-center align-items-center">
                        <button className="p-2 border border-end-0 rounded-pill rounded-end ms-0 " title='Like'>
                            <AiOutlineLike /> <span className='mt-1'>43.2M</span>
                        </button>
                        <button className="p-2 border rounded-pill rounded-start me-1" title='Dislike'>
                            <AiTwotoneDislike /> <span className='mt-1'>3.2K</span>
                        </button>
                        <button className="p-2 border rounded-pill mx-1" title='Share'>
                            <PiShareFat   /> <span className='mt-1'>Share</span>
                        </button>
                        <button className="p-2 border rounded-pill mx-1" title='Download'>
                            <LiaDownloadSolid  /> <span className='mt-1'>Download</span>
                        </button>
                        <div className="option dropright">
                             <button className="dropdown ms-2 p-2 border rounded-pill">
                                        <HiDotsHorizontal 
                                          className="fs-4 dropdown-toggle cursor-pointer"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        />
                                        <ul className="dropdown-menu py-2">
                                          <li>
                                            <a className="dropdown-item flex items-center px-4 py-2" href="#">
                                              <MdContentCut  />
                                              <span className="ms-2">Add to queue</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a className="dropdown-item flex items-center px-4 py-2" href="#">
                                              <CiBookmark  />
                                              <span className="ms-2">Save to Watch later</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a className="dropdown-item flex items-center px-4 py-2" href="#">
                                              <MdOutlinePlaylistPlay />
                                              <span className="ms-2">Save to playlist</span>
                                            </a>
                                          </li>
                                        </ul>
                            </button>
                        </div>
                    </div>
                    <div className={`col-12 d-md-none d-block overflow-x-auto ${style2.slider_horizontal} mt-2`}>
                        <button className="py-1 px-2 border border-end-0 rounded-pill rounded-end ms-0 " title='Like'>
                            <AiOutlineLike /> <span className='mt-1'>43.2M</span>
                        </button>
                        <button className="py-1 px-2 border rounded-pill rounded-start me-1" title='Dislike'>
                            <AiTwotoneDislike /> <span className='mt-1'>3.2K</span>
                        </button>
                        <button className="py-1 px-2 border rounded-pill mx-1" title='Dislike'>
                            <PiShareFat /> <span className='mt-1'>Share</span>
                        </button>
                        <button className="py-1 px-2 border rounded-pill mx-1" title='Dislike'>
                            <LiaDownloadSolid /> <span className='mt-1'>Download</span>
                        </button>
                        <button className="py-1 px-2 border rounded-pill mx-1" title='Dislike'>
                            <CiBookmark /> <span className='mt-1'>Save</span>
                        </button>
                        <button className="py-1 px-2 border rounded-pill mx-1" title='Dislike'>
                            <MdOutlineOutlinedFlag /> <span className='mt-1'>Report</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card d-flex align-items-center p-2 mt-2 lightSecondary" >
                <p className=" me-2 d-md-block d-none"><span className='fw-bold'>{video.views} Views</span>
                <span className="text-muted fw-bold mx-2">#{video.title}</span>
                <Description description={video.description} />
                </p>
                <small className=" me-2 d-md-none d-block"><span className='fw-bold'>{video.views} Views</span>
                <span className="text-muted fw-bold mx-2">#{video.title}</span>
                <Description description={video.description} />
                </small>
            </div>
            <div className="p-2 my-2">
                <p className='fs-4 fw-bold d-md-block d-none'>123 Comments</p>
                <CommentMobile video={video}/>
            </div>


      </>
    );
  }
  