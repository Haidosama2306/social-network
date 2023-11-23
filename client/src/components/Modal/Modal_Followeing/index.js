import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Following from "../../../pages/Following";

function ModalFollowing({ open, onClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Following/>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalFollowing;
