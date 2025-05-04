// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import AuthProvider from "../auth/sessionProvider.js";
import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "MTube",
  description: "enjoyments for the MTube",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossOrigin="anonymous"/>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossOrigin="anonymous"/>
      </head>
      <body>
        <AuthProvider>
          <Header />
                  <ToastContainer/>
          {children}
          <span className="d-md-none d-block" style={{marginTop:'8vh'}}>
            <Footer/>
          </span>
        </AuthProvider>
      </body>
    </html>
  );
}
