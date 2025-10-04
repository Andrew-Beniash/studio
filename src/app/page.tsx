
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";


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
  { name: "Payroll Records", status: "Review Needed" },
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

const trialBalanceData = [
    { account: 'Cash', debit: '25,000', credit: '' },
    { account: 'Accounts Receivable', debit: '18,500', credit: '' },
    { account: 'Prepaid Expenses', debit: '2,000', credit: '' },
    { account: 'Office Supplies', debit: '1,200', credit: '' },
    { account: 'Furniture & Equipment', debit: '15,000', credit: '' },
    { account: 'Accumulated Depreciation', debit: '', credit: '3,000' },
    { account: 'Accounts Payable', debit: '', credit: '9,800' },
    { account: 'Salaries Payable', debit: '', credit: '4,200', status: 'Mismatch' },
    { account: 'Unearned Revenue', debit: '', credit: '2,500' },
    { account: 'Bank Loan Payable', debit: '', credit: '10,000' },
    { account: 'Common Stock', debit: '', credit: '20,000' },
    { account: 'Retained Earnings', debit: '', credit: '8,200' },
    { account: 'Service Revenue', debit: '', credit: '40,000' },
    { account: 'Salaries Expense', debit: '22,000', credit: '' },
    { account: 'Rent Expense', debit: '6,000', credit: '' },
    { account: 'Utilities Expense', debit: '1,500', credit: '' },
    { account: 'Depreciation Expense', debit: '3,000', credit: '' },
    { account: 'Miscellaneous Expense', debit: '500', credit: '' },
];
  
const trialBalanceTotals = {
    debit: '94,700',
    credit: '94,700',
};


export default function Home() {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(
    null
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrievingDocuments, setIsRetrievingDocuments] = useState(false);
  const [suggestedResponses, setSuggestedResponses] = useState<string[]>([]);

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

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || chatInput;
    if (!messageToSend.trim()) return;
    
    setSuggestedResponses([]);

    const newMessages: Message[] = [...chatMessages, { role: "user", content: messageToSend }];
    setChatMessages(newMessages);
    setChatInput("");
    setIsLoading(true);

    try {
      const history = newMessages.slice(0, -1);
      const response = await sendMessage(history, messageToSend);
      setChatMessages([...newMessages, { role: "model", content: response }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatMessages([...newMessages, { role: "model", content: "Sorry, something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMismatchClick = () => {
    setIsChatOpen(true);
    setChatMessages([
      {
        role: "model",
        content:
          "For customer engagement at ABC Consulting, Inc., the trial balance reflects salaries payable of $4,200, while the payroll records show only $3,785 in outstanding liabilities, creating a variance of $415. This mismatch may stem from an un-reversed prior accrual, a duplicate manual entry, or timing differences in recording December payroll. From a tax perspective, the excess accrual could overstate deductible compensation and understate taxable income, while under-recorded liabilities may require adjustments to payroll records for accurate year-end reporting. The recommended next step is to obtain the client’s December payroll register and accrual schedules, confirm whether the $415 relates to holiday pay, bonuses, or overtime adjustments, and document the resolution in the tax workpapers to ensure accuracy in the year-end provision.",
      },
    ]);
    setSuggestedResponses([
        "Flag mismatch in workpapers.",
        "Ask client’s controller/payroll contact for clarification of $415.",
        "Document resolution for tax provision and deferred compensation review.",
    ]);
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
                      {selectedDocument === 'Trial Balance' ? (
                         <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold">Trial Balance of ABC Consulting, Inc.</h3>
                            <p className="text-sm text-muted-foreground">As of December 31, 2024</p>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="text-left">Account Name</TableHead>
                                    <TableHead className="text-right">Debit (USD)</TableHead>
                                    <TableHead className="text-right">Credit (USD)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {trialBalanceData.map((row) => (
                                    <TableRow key={row.account}>
                                        <TableCell className="text-left">
                                          <div className="flex items-center">
                                            <span>{row.account}</span>
                                            {row.status && (
                                              <Badge className="ml-2 bg-orange-500 text-white cursor-pointer" onClick={handleMismatchClick}>
                                                {row.status}
                                              </Badge>
                                            )}
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-right">{row.debit}</TableCell>
                                        <TableCell className="text-right">{row.credit}</TableCell>
                                    </TableRow>
                                    ))}
                                     <TableRow className="font-bold">
                                        <TableCell className="text-left">Totals</TableCell>
                                        <TableCell className="text-right">{trialBalanceTotals.debit}</TableCell>
                                        <TableCell className="text-right">{trialBalanceTotals.credit}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                         </div>
                      ) : (
                        <p>
                            Content for {selectedDocument} will be displayed here.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </main>
        <div
          className={`fixed top-11 right-0 h-full bg-slate-50/40 border-l transition-transform duration-300 ${
            isChatOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ width: "30%" }}
        >
          <div className="flex flex-col h-full p-4">
            <div className="flex justify-end items-center">
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
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {suggestedResponses.length > 0 && (
                <div className="flex flex-col items-start space-y-2">
                    {suggestedResponses.map((response, index) => (
                    <Button
                        key={index}
                        size="sm"
                        className="text-left h-auto bg-gradient-to-r from-[#78BE20] to-[#00A9CE] text-white whitespace-normal w-full"
                        onClick={() => handleSendMessage(response)}
                    >
                        {response}
                    </Button>
                    ))}
                </div>
              )}
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
              <Button onClick={() => handleSendMessage()} disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#78BE20] to-[#00A9CE] flex items-center justify-center hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition"
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

    