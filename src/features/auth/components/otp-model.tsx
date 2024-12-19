"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { sendEmailOTP, verifySecret } from "../actions";

interface OtpModalProps {
  accountId: string;
  email: string;
  onClose: () => void;
}

const OtpModal = ({ accountId, email, onClose }: OtpModalProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = async () => {
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError("");

    try {
      const sessionId = await verifySecret({ accountId, password: otp });

      if (sessionId) router.push("/dashboard");
    } catch (error) {
      console.log("Failed to verify OTP", error);
      setError("Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(30);
    setError("");

    try {
      await sendEmailOTP(email);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setError("Failed to resend code. Please try again.");
      setResendDisabled(false);
      console.log("Failed to resend OTP", error);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter verification code</DialogTitle>
          <DialogDescription>
            We&apos;ve sent a code to {email}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            disabled={isLoading}
            className="gap-2">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex w-full flex-col items-center gap-2">
            <Button
              onClick={handleSubmit}
              disabled={otp.length !== 6 || isLoading}
              className="w-full">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Verifying...
                </div>
              ) : (
                "Verify"
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Didn&apos;t receive the code?{" "}
              </span>
              {resendDisabled ? (
                <span className="text-primary">Resend in {countdown}s</span>
              ) : (
                <Button
                  variant="link"
                  className="h-auto p-0"
                  onClick={handleResend}>
                  Click to resend
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
