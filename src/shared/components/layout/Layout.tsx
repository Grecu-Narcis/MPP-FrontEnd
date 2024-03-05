import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import "./Layout.css";

export function Layout({ children }: any) {
  return (
    <div className="layout-container">
      <Header />

      {children}

      <Footer />
    </div>
  );
}
