import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MapPin, Image as ImageIcon, MoreVertical, CheckCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: {
    name: string;
    avatar: string;
    isVerified: boolean;
    location: string;
  };
  productTitle: string;
  productPrice: string;
}

export function ChatModal({ isOpen, onClose, seller, productTitle, productPrice }: ChatModalProps) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! Is this still available?", sender: "me", time: "10:30 AM", status: "read" },
    { id: 2, text: `Yes, the ${productTitle} is still available.`, sender: "them", time: "10:32 AM", status: "read" },
    { id: 3, text: "Great! Are you open to negotiation?", sender: "me", time: "10:35 AM", status: "read" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    
    // Mock reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sure, I can do a slight discount if you can meet today near the library.",
        sender: "them",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "read"
      }]);
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
            className="fixed bottom-4 right-4 z-50 flex h-[600px] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant sm:bottom-8 sm:right-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-card/50 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={seller.avatar} alt={seller.name} className="h-10 w-10 rounded-full bg-secondary" />
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
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full text-muted-foreground hover:bg-secondary">
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
              <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 rounded-full border-primary/20 text-primary">
                Make Offer
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-secondary/10">
              <div className="text-center">
                <span className="rounded-full bg-secondary px-2 py-1 text-[10px] text-muted-foreground">Today</span>
              </div>
              
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}>
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
                      <CheckCheck className={`h-3 w-3 ${msg.status === "read" ? "text-primary" : "text-muted-foreground"}`} />
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start">
                  <div className="flex max-w-[80%] items-center gap-1 rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }}></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }}></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-card p-3">
              <div className="flex gap-2 mb-2">
                <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-full gap-1 px-2 border-border/60">
                  <MapPin className="h-3 w-3" /> Meetup
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-muted-foreground hover:bg-secondary rounded-full">
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
    </AnimatePresence>
  );
}
