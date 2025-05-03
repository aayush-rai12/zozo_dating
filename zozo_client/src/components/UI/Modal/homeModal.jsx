import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeModal.css"; 

const HomeModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header className="custom-modal-header text-white">
        <Modal.Title className="custom-modal-title">ZOZO Dating</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body text-white">
        Join now and start finding your perfect match!
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Link to="/register" className="custom-modal-save-button">
          Create Account
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default HomeModal;
