import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { CiUser } from "react-icons/ci";
function Footer() {
  return (
    <div className="container bg-light border-top shadow-sm fixed-bottom">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-2">
      <Link
          href="/"
          className="col-md-4 d-flex flex-column align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          aria-label="Bootstrap"
        >
          <AiFillHome className=" fs-4" />
          <small>Home</small>
        </Link><Link
          href="/"
          className="col-md-4 d-flex flex-column align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          aria-label="Bootstrap"
        >
          <SiYoutubeshorts className=" fs-4" />
          <small>Shorts</small>
        </Link><Link
          href="/"
          className="col-md-4 d-flex flex-column align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          aria-label="Bootstrap"
        >
          <MdSubscriptions className=" fs-4" />
          <small>Subscriptions</small>
        </Link>
        <Link
          href="/feed/library"
          className="col-md-4 d-flex flex-column align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          aria-label="Bootstrap"
        >
            <span className=" border rounded-circle border-primary" style={{padding:'2px'}}>
                          <CiUser className=" fs-3 p-1 border border-0 rounded-circle"/>
                      </span>
          <small>Home</small>
        </Link>

      </footer>
    </div>
  )
}

export default Footer