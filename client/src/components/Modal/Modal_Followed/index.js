import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Followed from "../../../pages/Followed";

function ModalFollowed({ open, onClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Followed/>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalFollowed;
