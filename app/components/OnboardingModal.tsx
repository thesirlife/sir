"use client";

import Image from "next/image";
import Button from "./global/Button";
import { NavigateNext } from "@mui/icons-material";
import { Modal, Paper } from "@mui/material";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import onboarding from "@/app/cta-images/onboarding.jpg";

const OnboardingModal = () => {
	const searchParams = useSearchParams()
  const newUser = searchParams.get('newUser')

  const [open, setOpen] = useState(newUser ? true : false);

	const router = useRouter();
	const pathname = usePathname();

  const handleClose = () => {
		setOpen(false);
		router.replace(pathname);
	};

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        elevation={2}
        className="max-w-[466px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="p-6">
          <Image src={onboarding} alt="Onboarding" width={420} height={180} />
          <h2 className="text-xl font-bold mb-2 mt-3">
            Welcome To The SIR Digital Hub!
          </h2>
          <p className="text-lg text-navy-secondary mb-10">
            Here you will find a variety of fun games to stimulate the brain,
            interesting articles, and a chance to talk to your own AI Confidant!
            Start your day with the daily check list and explore everything else
            we have to offer.
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
