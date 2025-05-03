import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Home.css";
import imgbg0 from '../../assets/images/love.png';
import testIMG1 from '../../assets/images/loveBgm6.jpg';
import testIMG2 from '../../assets/images/loveBgm4.jpg';
import testIMG3 from '../../assets/images/loveBgm3.jpg';
import HomeModal from "../../components/UI/Modal/homeModal";
const HomeSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imgbg = {
    backgroundImage: `url(${imgbg0})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="main-container">
      <div className="content">
        <div className="content-inner">
          <div className="text-section">
            <h1 className="main-heading" data-aos="fade-right">
              Find your <span className="heading-span">love</span>
              <br />
              <span className="heading-gradient">By Being Yourself</span>
            </h1>
            <p className="main-paragraph" data-aos="fade-right" data-aos-delay="200">
              We designed a platform for people to find their love without being judged.
            </p>
            <button className="zozo-button" onClick={handleShow} data-aos="fade-right" data-aos-delay="400">
              Find Your Love
            </button>

            {/* Child Card Section */}
            <div className="child-card-section" style={imgbg}>
              <div className="child-card" data-aos="zoom-in">
                <span className="child-icon">👥</span>
                <h2 className="child-title">10k+ Members</h2>
                <p className="child-text">Over thousands of people are using happy match</p>
              </div>
              <div className="child-card" data-aos="zoom-in" data-aos-delay="200">
                <span className="child-icon">🧠</span>
                <h2 className="child-title">Smart AI</h2>
                <p className="child-text">Best match based on an intelligent algorithm</p>
              </div>
              <div className="child-card" data-aos="zoom-in" data-aos-delay="400">
                <span className="child-icon">❤️</span>
                <h2 className="child-title">Perfect Match</h2>
                <p className="child-text">10k+ people are happy using our platform</p>
              </div>
            </div>
          </div>

          {/* Card Feature Section */}
          <div className="car-feature">
            <div className="card-container">
              <div className="card card1">
                <img src={testIMG1} alt="Card 1" className="card-image" />
                <div className="card-text">
                  <h2 className="card-title" data-aos="zoom-in-left">Find your love</h2>
                </div>
              </div>
              <div className="card card2">
                <img src={testIMG2} alt="Card 2" className="card-image" />
                <div className="card-text">
                  <h2 className="card-title" data-aos="zoom-in-left">Find your love</h2>
                </div>
              </div>
              <div className="card card3">
                <img src={testIMG3} alt="Card 3" className="card-image" />
                <div className="card-text">
                  <h2 className="card-title" data-aos="zoom-in-left">Find your love</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Section */}
      {HomeModal({ show, handleClose })}
    </div>
  );
};

export default HomeSection;
