"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { sendEmailOTP, verifySecret } from "../actions";

const OtpModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log({ accountId, password });

    try {
      const sessionId = await verifySecret({ accountId, password });

      console.log({ sessionId });

      if (sessionId) router.push("/dashboard");
    } catch (error) {
      console.log("Failed to verify OTP", error);
    }

    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    await sendEmailOTP(email);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-x-[95%] space-y-4 rounded-xl bg-white px-4 py-10 outline-none sm:w-fit md:rounded-[30%] md:px-8">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter Your OTP
            <X className="absolute -right-1 -top-7 w-4 cursor-pointer sm:-right-2 sm:top-4" />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm font-semibold">
            We&apos;ve sent a code to <span className="pl-1">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="flex w-full justify-between gap-1 sm:gap-2">
            <InputOTPSlot
              index={0}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 text-lg font-medium shadow ring md:size-16"
            />
            <InputOTPSlot
              index={1}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 text-lg font-medium shadow ring md:size-16"
            />
            <InputOTPSlot
              index={2}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 text-lg font-medium shadow ring md:size-16"
            />
            <InputOTPSlot
              index={3}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 text-lg font-medium shadow ring md:size-16"
            />
            <InputOTPSlot
              index={4}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 text-lg font-medium shadow ring md:size-16"
            />
            <InputOTPSlot
              index={5}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 text-lg font-medium shadow ring md:size-16"
            />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="h-12 rounded-full bg-primary-foreground transition-all hover:bg-primary"
              type="button">
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>

            <div className="mt-2 text-center text-sm font-semibold">
              Didn&apos;t get a code?
              <Button
                type="button"
                variant="link"
                className="bg-primary pl-1"
                onClick={handleResendOtp}>
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
