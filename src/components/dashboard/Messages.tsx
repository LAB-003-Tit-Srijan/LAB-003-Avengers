import { useState } from "react";
import { Search, Send, Check, CheckCheck } from "lucide-react";

export function Messages() {
  const conversations = [
    {
      id: 1,
      name: "Rahul Verma",
      lastMessage: "Is the price negotiable?",
      time: "10:30 AM",
      unread: 2,
      product: "MacBook Air M1",
      avatar: "https://i.pravatar.cc/150?u=rahul",
    },
    {
      id: 2,
      name: "Sneha Patel",
      lastMessage: "I'll meet you at the library.",
      time: "Yesterday",
      unread: 0,
      product: "Engineering Math Textbook",
      avatar: "https://i.pravatar.cc/150?u=sneha",
    },
  ];

  const [activeChatId, setActiveChatId] = useState(conversations[0].id);
  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  return (
    <div className="flex h-[600px] border border-border rounded-2xl bg-card overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Sidebar - Contacts */}
      <div className="w-1/3 border-r border-border bg-muted/10 flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold font-display">Messages</h2>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`p-4 border-b border-border hover:bg-muted/30 cursor-pointer transition-colors relative ${activeChatId === chat.id ? "bg-muted/50" : ""}`}
            >
              <div className="flex gap-3">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3
                      className={`font-semibold text-sm truncate ${activeChatId === chat.id ? "text-primary" : ""}`}
                    >
                      {chat.name}
                    </h3>
                    <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-xs text-primary font-medium truncate mt-0.5">{chat.product}</p>
                  <p
                    className={`text-xs truncate mt-1 ${chat.unread && activeChatId !== chat.id ? "text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
              {chat.unread > 0 && activeChatId !== chat.id && (
                <div className="absolute top-4 right-4 h-5 w-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-background relative">
        <div className="p-4 border-b border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-3">
            <img src={activeChat.avatar} alt={activeChat.name} className="h-10 w-10 rounded-full" />
            <div>
              <h3 className="font-semibold">{activeChat.name}</h3>
              <p className="text-xs text-muted-foreground">Interested in: {activeChat.product}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex justify-center">
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              Today
            </span>
          </div>

          {activeChatId === 1 ? (
            <>
              <div className="flex flex-col gap-1 items-start">
                <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
                  Hey, is the MacBook still available?
                </div>
                <span className="text-[10px] text-muted-foreground ml-1">10:25 AM</span>
              </div>

              <div className="flex flex-col gap-1 items-end">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[80%]">
                  Yes, it is! Let me know if you want to meet up on campus to check it out.
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mr-1">
                  10:28 AM <CheckCheck className="h-3 w-3 text-primary" />
                </div>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
                  Is the price negotiable?
                </div>
                <span className="text-[10px] text-muted-foreground ml-1">10:30 AM</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-1 items-start">
              <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
                I'll meet you at the library.
              </div>
              <span className="text-[10px] text-muted-foreground ml-1">Yesterday</span>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border bg-card">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-muted/50 border border-border rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="absolute right-2 p-1.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
