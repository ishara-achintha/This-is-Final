import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerTop">
        {/* LEFT */}
        <div className="footerCol">
          <h3 className="footerBrand">Estate Agent</h3>
          <p className="footerText">
            Your trusted partner in real estate since 2020.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footerCol">
          <h4>Quick Links</h4>
          <ul>
            <li>Properties</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Services</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footerCol">
          <h4>Contact Us</h4>
          <p><i className="fas fa-phone"></i> +44 20 7123 456789</p>
          <p><i className="fas fa-envelope"></i> info@estateagent.co.uk</p>
          <p><i className="fas fa-map-marker-alt"></i> London, United Kingdom</p>
        </div>

        {/* FOLLOW US */}
        <div className="footerCol">
          <h4>Follow Us</h4>
              <div className="socialIcons">
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
              </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footerBottom">
        <p>© 2026 Estate Agent. All rights reserved.</p>
        <div className="footerLinks">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}
