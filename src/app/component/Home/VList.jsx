import { HiDotsVertical } from "react-icons/hi";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { BiSolidAddToQueue } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { FaShare } from "react-icons/fa";
import { FaRegFlag } from "react-icons/fa6";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import Link from "next/link";
import style from "./VList.module.css";

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
  
function VList({ list }) {
  return (
    <>
      <div className="card border-0 my-2" >
        <Link href={`/watch?slug=${list.slug}`} className={`${style.thumbnail}`}>
            <img
            src={list.thumbnailUrl}
            className="card-img-top border rounded"
            alt={list.title}
            />
            <span className="float-end position-absolute bottom-0 end-0 p-2 me-1 mb-1 badge" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
            {list.duration}
            </span>
        </Link>
        
      <div className="card-body row">
        <div className={`${style.profile} col-3`}>
          <img
            src={list.thumbnailUrl}
            className={`img-fluid rounded-circle `}
            alt={list.title}
          />
        </div>

    <div className="title col-8">
      <Link href={`/watch?slug=${list.slug}`} className={`card-text text-decoration-none text-dark fw-bold ${style.title} `}>{list.title.length > 70 ? `${list.title.slice(0, 70)}...` : list.title}</Link>
      <br />
      <Link className="d-md-block d-none text-dark text-decoration-none" href={`/channel/${list.author}`}><small className="card-text ">{list.author}</small></Link>
      <small className={` ${style.authorView} card-text text-muted`}>
        <span className="card-text me-1 d-md-none">{list.author}</span>
        <span>{formatNumber(list.views)} views</span>
        <span className="mx-1">{<TimeAgo date={list.uploadTime} />} ago</span>
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

    </>
  );
}

export default VList;
