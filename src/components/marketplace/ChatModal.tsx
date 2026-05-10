import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  MapPin,
  Image as ImageIcon,
  MoreVertical,
  CheckCheck,
  Clock,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetupVerification } from "./MeetupVerification";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: {
    name: string;
    id: string;
    avatar: string;
    isVerified: boolean;
    location: string;
  };
  productId: string;
  productTitle: string;
  productPrice: string;
}

const SCAM_KEYWORDS = ["advance", "paytm", "gpay", "phonepe", "prepay", "whatsapp"];

export function ChatModal({
  isOpen,
  onClose,
  seller,
  productId,
  productTitle,
  productPrice,
}: ChatModalProps) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! Is this still available?", sender: "me", time: "10:30 AM", status: "read" },
    {
      id: 2,
      text: `Yes, the ${productTitle} is still available.`,
      sender: "them",
      time: "10:32 AM",
      status: "read",
    },
    {
      id: 3,
      text: "Great! Are you open to negotiation?",
      sender: "me",
      time: "10:35 AM",
      status: "read",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMeetupVerify, setShowMeetupVerify] = useState(false);
  const [safetyWarning, setSafetyWarning] = useState<string | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    // AI Scam Detection Logic
    const lastThemMsg = [...messages].reverse().find((m) => m.sender === "them");
    if (lastThemMsg && SCAM_KEYWORDS.some((kw) => lastThemMsg.text.toLowerCase().includes(kw))) {
      setSafetyWarning("Caution: Seller mentioned off-platform payment. Never pay in advance.");
    } else {
      setSafetyWarning(null);
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Mock reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sure, I can do a slight discount if you can meet today near the library.",
          sender: "them",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "read",
        },
      ]);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed inset-0 z-50 flex h-full w-full flex-col overflow-hidden rounded-none border-0 border-border bg-card shadow-elegant sm:bottom-8 sm:right-8 sm:inset-auto sm:h-[600px] sm:max-w-[400px] sm:rounded-2xl sm:border"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-card/50 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="h-10 w-10 rounded-full bg-secondary"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-success"></span>
                </div>
                <div>
                  <h3 className="font-bold leading-none">{seller.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Online now</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-full text-muted-foreground hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Context/Product Bar */}
            <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2">
              <div className="text-xs">
                <span className="font-medium text-foreground">{productTitle}</span>
                <span className="mx-1 text-muted-foreground">•</span>
                <span className="font-bold text-primary">{productPrice}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-[10px] px-2 rounded-full border-primary/20 text-primary"
              >
                Make Offer
              </Button>
            </div>

            {/* Safety Warning Banner */}
            {safetyWarning && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="bg-destructive/10 border-b border-destructive/20 px-4 py-2 flex items-center gap-2"
              >
                <ShieldAlert className="h-4 w-4 text-destructive shrink-0" />
                <p className="text-[10px] font-bold text-destructive uppercase tracking-tight leading-tight">
                  {safetyWarning}
                </p>
              </motion.div>
            )}

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-secondary/10">
              <div className="text-center">
                <span className="rounded-full bg-secondary px-2 py-1 text-[10px] text-muted-foreground">
                  Today
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === "me"
                        ? "bg-primary text-primary-foreground rounded-br-sm shadow-sm"
                        : "bg-secondary text-secondary-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                    {msg.time}
                    {msg.sender === "me" && (
                      <CheckCheck
                        className={`h-3 w-3 ${msg.status === "read" ? "text-primary" : "text-muted-foreground"}`}
                      />
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start">
                  <div className="flex max-w-[80%] items-center gap-1 rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
                    <div
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-card p-3">
              <div className="flex gap-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMeetupVerify(true)}
                  className="h-7 text-[10px] rounded-full gap-1 px-2 border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
                >
                  <ShieldCheck className="h-3 w-3" /> Secure Meetup Verify
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0 text-muted-foreground hover:bg-secondary rounded-full"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="h-9 w-9 shrink-0 rounded-full bg-primary text-primary-foreground shadow-sm transition-transform active:scale-95"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Meetup Verification Dialog */}
      <Dialog open={showMeetupVerify} onOpenChange={setShowMeetupVerify}>
        <DialogContent className="p-0 sm:max-w-[400px] overflow-hidden rounded-3xl">
          <MeetupVerification
            listingTitle={productTitle}
            listingId={productId}
            sellerName={seller.name}
            sellerId={seller.id}
            amount={parseInt(productPrice.replace(/[^0-9]/g, "")) || 0}
            meetupLocation="Central Library Plaza"
            onComplete={() => setShowMeetupVerify(false)}
          />
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}
