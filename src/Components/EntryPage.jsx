import { useNavigate } from "react-router-dom";
import '../Pages/Entrypage.css'; 

// import "/src/Mobile/MobileEntryPage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EntryChatbot from "./EntryChatbot";

function Entrypage() {
  const navigate = useNavigate();
  return (
    <div className="container1">
      {/* Header Section */}
      <header className="header">
        <div className="logo1">
          <span>
            <img src="/images/logo1.png" alt="logo1png" />
          </span>
        </div>
        <div>
        <button className="login-btn"onClick={() => navigate("/signin")}>Log in</button>
        &nbsp;
        <button className="signup-btn" onClick={() => navigate("/signup")}>
          Sign up free
        </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        {/* Left Content */}
        <div className="hero-content">
          <h1>
            Grow Your Business Faster <br />
            with Hubly CRM
          </h1>
          <p>
            Manage leads, automate workflows, and close deals effortlessly—all
            in one powerful platform.
          </p>
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Get Started →{" "}
          </button>{" "}
          &nbsp;
          <span>
            <i className="fa-regular fa-circle-play"></i> Watch Video
          </span>
        </div>

        {/* Right Image */}
        <div className="hero-img">
          <img src="/images/img1.png" alt="Analytics" />
        </div>
      </section>
<div className="entrybot">
  <EntryChatbot />
</div>
      {/* Analytics Section */}
      <section className="analytics">
        <div>
          <img src="/images/img.png" alt="" />
        </div>
      </section>

      {/* Content Section */}
      <section className="content">
        <div className="content-text">
          <h2>At its core, Hubly is a robust CRM solution.</h2>
          <ul>
            <p>
              Hubly helps businesses streamline customer interactions, track
              leads, and automate tasks—saving you time and maximizing revenue.
              Whether you’re a startup or an enterprise, Hubly adapts to your
              needs, giving you the tools to scale efficiently.
            </p>
          </ul>
        </div>
        <div className="content-card">
          <img src="/images/img2.png" alt="Contentimg" />
        </div>
      </section>

      {/* Media and Content Section */}
      <section className="content">
        <div className="content-text">
          <h2>We have plans for everyone!</h2>
          <ul>
            <p>
              We started with a strong foundation, then simply built all of the
              sales and marketing tools ALL businesses need under one platform.
            </p>
          </ul>
        </div>
        <div className="content-card">
          <img src="/images/img3.png" alt="Contentimg" />
        </div>
      </section>

     

      {/* Footer */}
      <footer className="footer">
        <div className="footer-upper">
          <div className="logo1">
            <span>
              <img src="/images/logo1.png" alt="logo1png" />
            </span>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li>Universal checkout</li>
                <li>Payment workflows</li>
                <li>Observability</li>
                <li>UpliftAI</li>
                <li>Apps & integrations</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Why Primer</h4>
              <ul>
                <li>Expand to new markets</li>
                <li>Boost payment success</li>
                <li>Improve conversion rates</li>
                <li>Reduce payments fraud</li>
                <li>Recover revenue</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Developers</h4>
              <ul>
                <li>Primer Docs</li>
                <li>API Reference</li>
                <li>Payment methods guide</li>
                <li>Service status</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-links2">
          <div className="footer-column">
            <h4>Developers</h4>
            <ul>
              <li>Primer Docs</li>
              <li>API Reference</li>
              <li>Payment methods guide</li>
              <li>Service status</li>
              <li>Community</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Developers</h4>
            <ul>
              <li>Primer Docs</li>
              <li>API Reference</li>
              <li>Payment methods guide</li>
              <li>Service status</li>
              <li>Community</li>
            </ul>
          </div>
          <div className="social-icons">
            <i className="fab fa-twitter"></i>
            <a
              href="https://www.instagram.com/aditya_mohite_patil"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#000000" }}
            >
              <i className="fab fa-instagram"></i>
            </a>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-tiktok"></i>
            <i className="fas fa-fire"></i>
            <i className="fas fa-user"></i> 
            <i className="fas fa-gear"></i>
            <i className="fas fa-ellipsis"></i>
          </div>
          </div>

         
      
      </footer>
    </div>
  );
}

export default Entrypage;
