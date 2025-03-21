import React, { useContext, useState, useEffect, useRef } from "react";
import NoteContext from "../context/notes/noteContext";

function truncateText(text, maxLength) {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
}

function NoteItem({ note, updateNote, nothing, what, toggleFavourite }) {
  const [showModal, setShowModal] = useState(false);
  const [descriptionText, setDescriptionText] = useState("");
  const [copySuccessCard, setCopySuccessCard] = useState(false);
  const [copySuccessModal, setCopySuccessModal] = useState(false);
  const modalBodyRef = useRef(null);

  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setCopySuccessModal(false);
  };

  useEffect(() => {
    setDescriptionText(note.description);
  }, [note.description]);

  useEffect(() => {
    if (modalBodyRef.current && descriptionText.includes("\n")) {
      modalBodyRef.current.style.whiteSpace = "pre";
    }
  }, [descriptionText]);

  const copyToClipboard = (type) => {
    const textToCopy = `Title: ${note.title}\nDescription: ${note.description}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (type === "card") {
        setCopySuccessCard(true);
        setTimeout(() => setCopySuccessCard(false), 1500);
      } else {
        setCopySuccessModal(true);
        setTimeout(() => setCopySuccessModal(false), 1500);
      }
    });
  };

  const tagStyle = {
    display: "inline-block",
    padding: "5px 10px",
    backgroundColor: "#e2e8f0",
    color: "#2d3748",
    borderRadius: "5px",
    marginTop: "10px",
    marginBottom: "3px",
  };

  return (
    <div className="col-md-3 mb-4 mx-2">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">{truncateText(note.title, 25)}</h5>
            <span style={tagStyle}>{note.tag}</span>
          </div>
          <p className="card-text text-muted">
            {truncateText(note.description, 58)}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={openModal}
            >
              <i className="fas fa-eye me-2"></i>View
            </button>
            {!nothing && (
              <div>
                <button
                  className="btn btn-link text-primary p-0 me-2"
                  onClick={() => updateNote(note)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => deleteNote(note._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            )}
          </div>
          {/* Copy Button Outside Modal */}
          <button
            className="btn btn-sm btn-success mt-2"
            onClick={() => copyToClipboard("card")}
            disabled={copySuccessCard}
          >
            {copySuccessCard ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title">{note.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div
                className="modal-body"
                ref={modalBodyRef}
                style={{ overflowWrap: "break-word", whiteSpace: "pre-wrap" }}
              >
                {descriptionText}
              </div>
              <div className="modal-body">
                {note.image ? (
                  <div className="relative w-full h-40 overflow-hidden rounded-md border border-gray-300">
                    <img
                      src={note.image}
                      alt="Current Note"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <p>No image uploaded</p>
                )}
              </div>
              <div className="modal-footer bg-light">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                {/* Copy Button Inside Modal */}
                <button
                  className="btn btn-success"
                  onClick={() => copyToClipboard("modal")}
                  disabled={copySuccessModal}
                >
                  {copySuccessModal ? "Copied!" : "Copy to Clipboard"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteItem;
