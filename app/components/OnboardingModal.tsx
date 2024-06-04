"use client";

import Image from "next/image";
import Button from "./global/Button";
import { NavigateNext } from "@mui/icons-material";
import { Modal, Paper } from "@mui/material";
import { useState } from "react";

const OnboardingModal = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        elevation={2}
        className="max-w-[466px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="p-4">
          <Image
            src="/images/illustrations/onboarding.svg"
            alt="Onboarding"
            width={420}
            height={180}
          />
          <h2 className="text-xl font-bold mb-2">
            Welcome to the online box experience!
          </h2>
          <p className="text-lg text-navy-secondary mb-10">
            We offer free games, learning and community for those who have
            received our boxes. Explore the platform and engage with the
            community!
          </p>

          <Button
            color="warning"
            variant="contained"
            endIcon={<NavigateNext fontSize="medium" />}
            onClick={handleClose}
          >
            Continue
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default OnboardingModal;
