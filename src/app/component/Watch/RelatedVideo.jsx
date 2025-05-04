import { HiDotsVertical } from "react-icons/hi";
import { BiSolidAddToQueue } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { FaShare } from "react-icons/fa";
import { FaRegFlag } from "react-icons/fa6";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { AiOutlineLike } from "react-icons/ai";

import Link from "next/link";

export default async function Option({ video }) {
  function TimeAgo({ date }) {
    const newDate = new Date(date);
    const formattedDate = newDate.toISOString().split('T')[0];
    const parsedDate = parseISO(formattedDate);
    let timeAgo = formatDistanceToNow(parsedDate);
    timeAgo = timeAgo.replace('almost ', '');
    return timeAgo;
  }

  function formatNumber(num) {
    num = parseInt(num.replace(/,/g, ''), 10);
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B'; // Billions
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M'; // Millions
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K'; // Thousands
    } else {
      return num.toString(); // If it's less than 1,000
    }
  }

  return (
    <div className="card my-2">
      <div className="card-body row">
        <div className=" col-4">
        <Link href={`/watch?slug=${video.slug}`} style={{ position: 'relative' }}>
          <img
            src={video.thumbnailUrl}
            className="img-fluid rounded"
            alt={(video.title).slice(0,70)}
            style={{ width: '100%',}}
          />
          <span className=" position-absolute start-0 badge" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
            {video.duration}
          </span>
        </Link>

        </div>

        <div className="title col-7">
          {/* Use Bootstrap classes to style the Link */}
          <Link href={`/watch?slug=${video.slug}`} className="card-text text-decoration-none text-dark cursor-pointer">
            {(video.title).slice(0,70)}
          </Link>
          <br />
          <small className="card-text">{video.author}</small>
          <small className="card-text d-block">
            <smal>{formatNumber(video.views)} views</smal>
            <span className="mx-1">{<TimeAgo date={video.uploadTime} />} ago</span>
          </small>
        </div>

        <div className="option col-1">
          <div className="dropdown">
            <HiDotsVertical
              className="fs-4 dropdown-toggle cursor-pointer"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu py-2">
              <li>
                <a className="dropdown-item flex items-center px-4 py-2" href="#">
                  <BiSolidAddToQueue />
                  <span className="ms-2">Add to queue</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item flex items-center px-4 py-2" href="#">
                  <IoMdTime />
                  <span className="ms-2">Save to Watch later</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item flex items-center px-4 py-2" href="#">
                  <MdOutlinePlaylistPlay />
                  <span className="ms-2">Save to playlist</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item flex items-center px-4 py-2" href="#">
                  <HiDownload />
                  <span className="ms-2">Download</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item flex items-center px-4 py-2" href="#">
                  <FaShare />
                  <span className="ms-2">Share</span>
                </a>
              </li>
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
    </div>
  );
}
