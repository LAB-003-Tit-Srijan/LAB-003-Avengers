import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, MapPin, QrCode, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { completeTransaction } from "@/lib/listings";

interface MeetupVerificationProps {
  listingTitle: string;
  listingId: string;
  sellerName: string;
  sellerId: string;
  amount: number;
  meetupLocation: string;
  onComplete: () => void;
}

export function MeetupVerification({
  listingTitle,
  listingId,
  sellerName,
  sellerId,
  amount,
  meetupLocation,
  onComplete,
}: MeetupVerificationProps) {
  const [step, setStep] = useState<"initial" | "otp" | "success">("initial");
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (otp === "123456") {
      // Mock OTP for hackathon demo
      try {
        await completeTransaction({
          listingId,
          buyerId: "current-user-id", // In real app, get from auth
          sellerId,
          amount,
        });
        setStep("success");
        setTimeout(() => {
          onComplete();
          toast.success("Transaction verified & completed!");
        }, 2000);
      } catch (err) {
        toast.error("Failed to complete transaction database update.");
      }
    } else {
      toast.error("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <AnimatePresence mode="wait">
        {step === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Safe Meetup Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Verify the item in person before completing.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Item:</span>
                <span className="font-semibold">{listingTitle}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Seller:</span>
                <span className="font-semibold">{sellerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-semibold inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" /> {meetupLocation}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setStep("otp")}
              >
                <QrCode className="mr-2 h-4 w-4" /> Scan QR or Enter OTP
              </Button>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
                Security Tip: Never pay before verifying the product
              </p>
            </div>
          </motion.div>
        )}

        {step === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 flex flex-col items-center"
          >
            <div className="text-center">
              <h3 className="font-bold text-lg">Enter Verification Code</h3>
              <p className="text-sm text-muted-foreground">
                Ask the seller for the 6-digit code shown on their screen.
              </p>
            </div>

            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <div className="w-full space-y-3">
              <Button className="w-full h-11" disabled={otp.length !== 6} onClick={handleVerify}>
                Confirm Verification
              </Button>
              <Button variant="ghost" className="w-full text-xs" onClick={() => setStep("initial")}>
                Go Back
              </Button>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-warning/10 border border-warning/20 text-[11px] text-warning-foreground">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                By entering this code, you confirm that you have received and inspected the item.
                The transaction will be marked as complete.
              </span>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 space-y-4"
          >
            <div className="h-20 w-20 rounded-full bg-success/20 flex items-center justify-center text-success">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
              >
                <CheckCircle2 className="h-12 w-12" />
              </motion.div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">Verified!</h3>
              <p className="text-sm text-muted-foreground">
                The transaction is now complete. You can now leave a verified review.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
