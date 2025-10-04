
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { tasks } from "@/lib/tasks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Mic, Loader2 } from "lucide-react";
import { sendMessage } from "./actions";
import { Checkbox } from "@/components/ui/checkbox";

type Message = {
  role: "user" | "model";
  content: string;
};

const getPriorityBadgeVariant = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "destructive";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
    default:
      return "default";
  }
};

const deliverables = [
  {
    name: "Tax Planning Memorandum",
    status: "Draft",
    lastUpdated: "2024-09-28",
  },
  {
    name: "After-Tax Savings Schedule",
    status: "Reviewed",
    lastUpdated: "2024-09-25",
  },
  {
    name: "Presentation",
    status: "Final",
    lastUpdated: "2024-09-20",
  },
];
const documents = [
  { name: "Tax Returns 2024" },
  { name: "Trial Balance", status: "Review Needed" },
  { name: "Fixed Asset Register" },
  { name: "Payroll Records" },
  { name: "State Appointment Data" },
  { name: "Forecasts and Budget" },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "draft":
      return "secondary";
    case "reviewed":
      return "outline";
    case "final":
      return "default";
    default:
      return "default";
  }
};


export default function Home() {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(
    null
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: "model", content: "Hello! How can I help you today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrievingDocuments, setIsRetrievingDocuments] = useState(false);

  useEffect(() => {
    if (selectedTaskId !== null) {
      setIsRetrievingDocuments(true);
      const timer = setTimeout(() => {
        setIsRetrievingDocuments(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedTaskId]);

  const handleTaskClick = (taskId: number) => {
    setSelectedTaskId(taskId);
    setSelectedDocument(null);
  };

  const handleTitleClick = () => {
    setSelectedTaskId(null);
    setSelectedDocument(null);
  };

  const handleDocumentClick = (doc: string) => {
    setSelectedDocument(doc);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const newMessages: Message[] = [...chatMessages, { role: "user", content: chatInput }];
    setChatMessages(newMessages);
    setChatInput("");
    setIsLoading(true);

    try {
      const history = newMessages.slice(0, -1);
      const response = await sendMessage(history, chatInput);
      setChatMessages([...newMessages, { role: "model", content: response }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatMessages([...newMessages, { role: "model", content: "Sorry, something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header onTitleClick={handleTitleClick} />
      <div className="flex flex-grow pt-16">
        <main
          className={`flex-grow pb-12 px-4 sm:px-6 lg:px-8 flex flex-col transition-all duration-300 ${
            isChatOpen ? "pr-[30%]" : ""
          }`}
        >
          {selectedTaskId === null ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className="flex flex-col shadow-drop-center cursor-pointer"
                  onClick={() => handleTaskClick(task.id)}
                >
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.customerName}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    <div className="flex justify-between items-end">
                      <div>
                        <Badge variant={getPriorityBadgeVariant(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">
                          Due Date
                        </p>
                        <p className="text-sm">{task.dueDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8 flex-grow">
              <div className="col-span-1 flex flex-col gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Deliverables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4 text-sm">
                      {deliverables.map((doc) => (
                        <li key={doc.name} className="flex items-center space-x-2">
                          <Checkbox id={doc.name} />
                          <label
                            htmlFor={doc.name}
                            onClick={() => handleDocumentClick(doc.name)}
                            className="cursor-pointer hover:underline leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {doc.name}
                          </label>
                          <Badge variant={getStatusBadgeVariant(doc.status)}>
                            {doc.status}
                          </Badge>
                          <Badge variant="outline">
                            {doc.lastUpdated}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Document Intake and Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isRetrievingDocuments ? (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Retrieving documents from iManage</span>
                      </div>
                    ) : (
                      <ul className="space-y-2 text-sm">
                        {documents.map((doc) => (
                          <li
                            key={doc.name}
                            onClick={() => handleDocumentClick(doc.name)}
                            className="cursor-pointer hover:underline flex items-center"
                          >
                            <span>{doc.name}</span>
                            {doc.status === 'Review Needed' && (
                              <Badge 
                                className="ml-2 bg-orange-500 text-white"
                              >
                                {doc.status}
                              </Badge>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-2 flex flex-col">
                {selectedDocument && (
                  <Card className="flex-grow flex flex-col">
                    <CardHeader>
                      <CardTitle>{selectedDocument}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p>
                        Content for {selectedDocument} will be displayed here.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </main>
        <div
          className={`fixed top-11 right-0 h-full bg-slate-50 border-l transition-transform duration-300 ${
            isChatOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ width: "30%" }}
        >
          <div className="flex flex-col h-full p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Chat</h2>
              <button onClick={toggleChat} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-grow p-4 bg-muted/40 rounded-lg my-4 space-y-4 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
               {isLoading && (
                  <div className="flex justify-start">
                    <div className="p-2 rounded-lg bg-secondary">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  </div>
                )}
            </div>
            <div className="flex items-center gap-2 mb-5">
              <Button variant="ghost" size="icon">
                <Mic className="w-5 h-5" />
              </Button>
              <Input 
                placeholder="Type your message..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-slate-700 to-slate-500 flex items-center justify-center hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-7 h-7 text-white transition"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.985 9.985 0 01-4.418-.938L3 20l1.938-4.418A9.985 9.985 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
