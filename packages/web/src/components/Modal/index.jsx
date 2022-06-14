import Modal from "react-modal";

const ModalComponent = ({ isOpen, setIsOpen, children, customsStyle }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={{
        overlay: {
          zIndex: 9999,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
          width: "max-content",
          height: "max-content",
          border: "none",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
          ...customsStyle,
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
