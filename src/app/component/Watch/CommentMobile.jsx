'use client'

import Link from "next/link";
import { useState } from "react";
import { AiOutlineLike, AiTwotoneDislike } from "react-icons/ai";
import { FaRegFlag } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import Comment from "./Comment";

function CommentMobile({ video }) {
  const [more, setMore] = useState(false);

  return (
    <>
        <div className="d-md-none d-block">
            <div className="accordion accordion-flush card rounded" id="accordionFlushExample">
                <div className="accordion-item card">
                    <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Comments 123
                    </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div  className="row my-2 border-bottom p-2">
                            <div className="col-3">
                                <img
                                className="img-fluid rounded-circle"
                                src={video.thumbnailUrl}
                                alt={video.title}
                                style={{ width: '100%', height: '7vh' }}
                                />
                            </div>
                            <div className="col-9">
                                <div className="card p-2">
                                    <textarea className="border-0 textArea" name="commentInput" id="commentInput" placeholder="Add a comment" rows={2}></textarea>
                                </div>
                                <button className="btn btn-primary btn-sm float-end mt-1">comment</button>
                            </div>
                        </div>
                        {Array.from({ length: 5 }, (_, index) => (
                            <div key={index} className="row my-2 border-bottom p-2">
                                <div className="col-3">
                                    <img
                                    className="img-fluid rounded-circle"
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    style={{ width: '100%', height: '7vh' }}
                                    />
                                </div>
                                <div className="col-9 d-flex justify-content-between">
                                    <small className="comment">
                                        <Link href={`/${video.channel}`} className="text-decoration-none text-dark fw-bold">
                                            {video.channel}
                                        </Link>
                                        <small className="fw-bold text-muted"> 1 day ago</small>
                                        <small className="d-block">this is the comment box</small>
                                        <div className="d-flex">
                                            <button className="flex items-center justify-center border rounded-pill rounded-end px-1">
                                            <AiOutlineLike className="m-1" />12
                                            </button>
                                            <button className="flex items-center justify-center border rounded-pill rounded-start px-1">
                                            <AiTwotoneDislike className=" m-1" />5
                                            </button>
                                        </div>
                                    </small>
                                    <div className="dropdown">
                                        <HiDotsVertical
                                            className="fs-4 dropdown-toggle cursor-pointer"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        />
                                        <ul className="dropdown-menu py-2">
                                            <li>
                                            <a className="dropdown-item flex items-center px-4 py-2" href="#">
                                                <FaRegFlag />
                                                <span className="ms-2">Report</span>
                                            </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="d-md-block d-none">
            <div  className="row my-2 p-2">
                <div className="col-2">
                    <img
                    className="img-fluid rounded-circle"
                    src={video.thumbnailUrl}
                    alt={video.title}
                    style={{ width: '4vw', height: '9vh' }}
                    />
                </div>
                <div className="col-10">
                    <div className="card p-2">
                        <textarea className="border-0 textArea" name="commentInput" id="commentInput" placeholder="Add a comment" rows={2}></textarea>
                    </div>
                    <button className="btn btn-primary btn-sm float-end mt-1">comment</button>
                </div>
            </div>
            <Comment video={video}/>
        </div>
    </>
  );
}

export default CommentMobile;
