"use client";

import Image from "next/image";
import Button from "./global/Button";
import { NavigateNext } from "@mui/icons-material";
import { Modal, Paper } from "@mui/material";
import { useState } from "react";
import onboarding from "@/app/cta-images/onboarding.jpg";

const OnboardingModal = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        elevation={2}
        className="max-w-[466px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="p-6">
          <Image src={onboarding} alt="Onboarding" width={420} height={180} />
          <h2 className="text-xl font-bold mb-2 mt-3">
            Welcome To The Online Box Experience!
          </h2>
          <p className="text-lg text-navy-secondary mb-10">
            Here you will find a variety of fun games to stimulate the brain,
            interesting articles, and a change to talk to your own AI Confident!
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
