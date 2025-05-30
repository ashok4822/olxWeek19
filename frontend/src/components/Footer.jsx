import React from "react";
import appleStore from "../assests/appstore_2x.webp";
import playStore from "../assests/playstore_2x.webp";
import facebook from "../assests/facebook.png";
import twitter from "../assests/twitter1.png";
import instagram from "../assests/instagram.png";
import carTradeTech from "../assests/cartrade_tech.png";
import bikewale from "../assests/bikewale.png";
import carTrade from "../assests/cartrade.png";
import mobility from "../assests/mobility.png";
import carWale from "../assests/carwale.png";
import footerOlx from "../assests/footer-olx.png";
import play from "../assests/play.png";
import "../App.css";

const Footer = () => {
  return (
    <div>
      <div className="footer-1">
        <div className="footer-1-links">
          <h3 className="footer-1-title">Popular Locatrions</h3>
          <ul className="footer-1-list">
            <li className="footer-1-listitem">Kolkata</li>
            <li className="footer-1-listitem">Mumbai</li>
            <li className="footer-1-listitem">Chennai</li>
            <li className="footer-1-listitem">Pune</li>
          </ul>
        </div>
        <div className="footer-1-links">
          <h3 className="footer-1-title">Trending Locations</h3>
          <ul className="footer-1-list">
            <li className="footer-1-listitem">Bhubaneshwar</li>
            <li className="footer-1-listitem">Hyderabad</li>
            <li className="footer-1-listitem">Chandigarh</li>
            <li className="footer-1-listitem">Nashik</li>
          </ul>
        </div>
        <div className="footer-1-links">
          <h3 className="footer-1-title">About Us</h3>
          <ul className="footer-1-list">
            <li className="footer-1-listitem">Tech@OLX</li>
          </ul>
        </div>
        <div className="footer-1-links">
          <h3 className="footer-1-title">OLX</h3>
          <ul className="footer-1-list">
            <li className="footer-1-listitem">Blog</li>
            <li className="footer-1-listitem">Help</li>
            <li className="footer-1-listitem">Sitemap</li>
            <li className="footer-1-listitem">Legal & Privacy information</li>
            <li className="footer-1-listitem">
              Vulnerability Disclosure Program
            </li>
          </ul>
        </div>
        <div className="footer-1-links">
          <h3 className="footer-1-title">Follow Us</h3>
          <ul className="footer-1-list-social">
            <li className="footer-1-listitem">
              <img src={facebook} alt="" height={25} />
            </li>
            <li className="footer-1-listitem">
              <img src={twitter} alt="" height={25} />
            </li>
            <li className="footer-1-listitem">
              <img src={instagram} alt="" height={25} />
            </li>
            <li className="footer-1-listitem">
              <img src={play} alt="" height={25} />
            </li>
          </ul>
          <div className="footer-1-images">
            <img src={playStore} alt="" width={100} />
            <img src={appleStore} alt="" width={100} />
          </div>
        </div>
      </div>
      <div className="footer-2">
        <div>
          <div className="footer-2-left">
            <img src={carTradeTech} alt="" height={100} />
          </div>
        </div>
        <hr />
        <div className="footer-2-right">
          <img src={footerOlx} alt="" height={80} />
          <img src={carWale} alt="" height={60} />
          <img src={bikewale} alt="" height={60} />
          <img src={mobility} alt="" height={60} />
          <img src={carTrade} alt="" height={60} />
        </div>
      </div>
      <div className="footer-3">
        <div>
          <span className="footer-3-text">Help - Sitemap</span>
        </div>
        <div>
          <span className="footer-3-text">
            All rights reserved © 2006-2024 OLX
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
