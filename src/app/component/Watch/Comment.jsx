import { AiOutlineLike, AiTwotoneDislike } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';
import { FaRegFlag } from 'react-icons/fa';
import Link from 'next/link';

export default function Comment({ video }) {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="row my-2">
          <img
            className="img-fluid col-2 rounded-circle"
            src={video.thumbnailUrl}
            alt={video.title}
            style={{ width: '5vw', height: '8vh' }}
          />
          <div className="col-10 d-flex justify-content-between">
            <div className="comment">
              <Link href={`/${video.channel}`} className="text-decoration-none text-dark fw-bold">
                {video.channel}
              </Link>
              <small className="fw-bold text-muted ms-1">1 day ago</small>
              <small className="d-block">this is the comment box</small>
              <div className="d-flex justify-content-center align-items-center">
                <button className="d-flex align-items-center justify-content-center border rounded-circle">
                  <AiOutlineLike className="fs-4 m-1" />
                </button>
                <button className="d-flex align-items-center justify-content-center border rounded-circle">
                  <AiTwotoneDislike className="fs-4 m-1" />
                </button>
                <button className="px-3 mx-5 d-flex align-items-center justify-content-center border rounded-pill">
                  Reply
                </button>
              </div>
            </div>
            <div className="dropdown">
              <HiDotsVertical
                className="fs-4 dropdown-toggle cursor-pointer"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul className="dropdown-menu py-2">
                <li>
                  <a className="dropdown-item d-flex align-items-center px-4 py-2" href="#">
                    <FaRegFlag />
                    <span className="ms-2">Report</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
