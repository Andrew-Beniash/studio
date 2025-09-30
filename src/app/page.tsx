
"use client";

import { useState } from "react";
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
  "Tax Planning Memorandum",
  "After-Tax Savings Schedule",
  "Presentation",
];
const documents = [
  "Tax Returns 2024",
  "Trial Balance",
  "Fixed Asset Register",
  "Payroll Records",
  "State Appointment Data",
  "Forecasts and Budget",
];

export default function Home() {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(
    null
  );
  const [isChatOpen, setIsChatOpen] = useState(false);

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header onTitleClick={handleTitleClick} />
      <div className="flex flex-grow pt-16">
        <main
          className={`flex-grow pb-12 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col transition-all duration-300 ${
            isChatOpen ? "pr-96" : "pr-4"
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
                    <ul className="space-y-2 text-sm">
                      {deliverables.map((doc) => (
                        <li
                          key={doc}
                          onClick={() => handleDocumentClick(doc)}
                          className="cursor-pointer hover:underline"
                        >
                          {doc}
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
                    <ul className="space-y-2 text-sm">
                      {documents.map((doc) => (
                        <li
                          key={doc}
                          onClick={() => handleDocumentClick(doc)}
                          className="cursor-pointer hover:underline"
                        >
                          {doc}
                        </li>
                      ))}
                    </ul>
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
          style={{ width: "24rem" }}
        >
          <div className="flex flex-col h-full p-4">
            <h2 className="text-lg font-semibold">Chat</h2>
            <div className="flex-grow p-4 bg-muted/40 rounded-lg my-4">
              <p className="text-sm text-foreground">
                Hello! How can I help you today?
              </p>
            </div>
            <div className="flex gap-2 mb-5">
              <Input placeholder="Type your message..." />
              <Button>Send</Button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center hover:shadow-[0_0_15px_rgba(120,190,32,0.7)] transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-7 h-7 text-[#78BE20] hover:text-[#00A9CE] transition"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.985 9.985 0 01-4.418-.938L3 20l1.938-4.418A9.985 9.985 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    </div>
  );
}
