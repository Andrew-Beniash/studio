
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Header } from "@/components/header";
import { tasks, type Task } from "@/lib/tasks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Mic, Loader2 } from "lucide-react";
import { sendMessage } from "./actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { placeholderImages } from "@/lib/placeholder-images";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { OpportunityAnalysisContent } from "@/components/opportunity-analysis";

type Message = {
  role: "user" | "model";
  content: string;
};

const getPriorityBadgeVariant = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "high";
    case "medium":
      return "medium";
    case "low":
      return "medium";
    default:
      return "default";
  }
};

const deliverables = [
  {
    name: "Tax Planning Memorandum",
    status: "Draft",
  },
  {
    name: "After-Tax Savings Schedule",
    status: "Reviewed",
  },
  {
    name: "Presentation",
    status: "Final",
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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(
    null
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrievingDocuments, setIsRetrievingDocuments] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [suggestedResponses, setSuggestedResponses] = useState<string[]>([]);
  const [explainChip, setExplainChip] = useState<{ top: number; left: number; width: number } | null>(null);
  const [isExplainChipExpanded, setIsExplainChipExpanded] = useState(false);
  const [isOpportunityAnalysisOpen, setIsOpportunityAnalysisOpen] = useState(false);
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedTask) {
      setIsRetrievingDocuments(true);
      const timer = setTimeout(() => {
        setIsRetrievingDocuments(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedTask]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatPanelRef.current && !chatPanelRef.current.contains(event.target as Node)) {
        // Do not close chat if clicking on explain chip
        if ((event.target as HTMLElement).closest('[data-explain-chip]')) return;
        setIsChatOpen(false);
      }
    }

    if (isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen]);

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
        // Don't show chip if clicking on an already expanded chip
        if ((event.target as HTMLElement).closest('[data-explain-chip]')) {
            return;
        }

        const selection = window.getSelection();
        if (selection && selection.toString().trim() !== "" && contentRef.current?.contains(selection.anchorNode)) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const contentRect = contentRef.current.getBoundingClientRect();
            setExplainChip({
                top: rect.top - contentRect.top - 35, // Position above selection
                left: rect.left - contentRect.left + (rect.width / 2) - 40, // Center horizontally
                width: rect.width
            });
            setIsExplainChipExpanded(false); // Reset expanded state
        } else {
            setExplainChip(null);
            setIsExplainChipExpanded(false);
        }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
        document.removeEventListener("mouseup", handleMouseUp);
    };
}, []);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setSelectedDocument(null);
  };

  const handleTitleClick = () => {
    setSelectedTask(null);
    setSelectedDocument(null);
  };

  const handleDocumentClick = (doc: string) => {
    setSelectedDocument(doc);
    if (doc === 'Tax Planning Memorandum') {
      setIsDrafting(true);
      const timer = setTimeout(() => {
        setIsDrafting(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
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
  
  const handleExplainClick = () => {
    setIsExplainChipExpanded(!isExplainChipExpanded);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onTitleClick={handleTitleClick}
        selectedTask={selectedTask}
        onOpportunityAnalysisClick={() => setIsOpportunityAnalysisOpen(true)}
      />
      <div className="flex flex-grow pt-16">
        <main
          className={`flex-grow pb-12 px-4 sm:px-6 lg:px-8 flex flex-col transition-all duration-300 ${
            isChatOpen ? "pr-[30%]" : ""
          }`}
        >
          {selectedTask === null ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className="flex flex-col shadow-drop-center cursor-pointer"
                  onClick={() => handleTaskClick(task)}
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
                <Card className="shadow-drop-center">
                  <CardHeader>
                    <CardTitle>Deliverables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm -mx-2">
                      {deliverables.map((doc) => (
                        <li
                          key={doc.name}
                          onClick={() => handleDocumentClick(doc.name)}
                          className="flex items-center justify-between p-2 rounded-md cursor-pointer font-normal text-[#1d1d1f] cursor-pointer hover:bg-[#f5f5f7] hover:text-blue-600 focus:bg-[#f5f5f7] focus:text-blue-600"
                        >
                          <span>{doc.name}</span>
                          <Badge variant={getStatusBadgeVariant(doc.status)}>
                            {doc.status}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="shadow-drop-center">
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
                      <ul className="space-y-1 text-sm -mx-2">
                        {documents.map((doc) => (
                          <li
                            key={doc.name}
                            onClick={() => handleDocumentClick(doc.name)}
                            className="cursor-pointer flex items-center justify-between p-2 rounded-md font-normal text-[#1d1d1f] cursor-pointer hover:bg-[#f5f5f7] hover:text-blue-600 focus:bg-[#f5f5f7] focus:text-blue-600"
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
                <Card className="shadow-drop-center">
                  <CardHeader>
                    <CardTitle>Engagement Team</CardTitle>
                  </CardHeader>
                  <CardContent className="flex space-x-2">
                    {placeholderImages.slice(0, 4).map((image, index) => (
                      <Avatar key={image.id} className={index === placeholderImages.slice(0, 4).length - 1 ? 'border border-green-500' : ''}>
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          width={40}
                          height={40}
                          className="object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      </Avatar>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-2 flex flex-col">
                {selectedDocument && (
                  <Card className="flex-grow flex flex-col shadow-drop-center">
                    <CardHeader>
                      <CardTitle>{selectedDocument}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow relative" ref={contentRef}>
                      {explainChip && (
                          <div
                              data-explain-chip
                              className={`absolute z-10 text-white bg-gradient-to-r from-[#78BE20] to-[#00A9CE] rounded-md shadow-lg cursor-pointer transition-all duration-300 ${isExplainChipExpanded ? 'p-4 max-w-md' : 'px-3 py-1 text-sm'}`}
                              style={{ top: `${explainChip.top}px`, left: `${explainChip.left}px` }}
                              onClick={handleExplainClick}
                          >
                              {isExplainChipExpanded ? (
                                <div className="text-sm space-y-2">
                                  <h4 className="font-bold">Payroll Accrual Mismatch</h4>
                                  <p>Trial balance reflects $4,200 in salaries payable, while payroll records support $3,785, resulting in a variance of $415.</p>
                                  <p><strong>Recommendation:</strong> Confirm whether the variance is attributable to unrecorded holiday/overtime pay or an over-accrual. Adjust as appropriate to avoid overstating deductible compensation. This ensures compliance with IRS regulations on timing of wage deductions under IRC §461.</p>
                                </div>
                              ) : (
                                'Explain'
                              )}
                          </div>
                      )}
                      {isDrafting && selectedDocument === 'Tax Planning Memorandum' ? (
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Drafting</span>
                        </div>
                      ) : selectedDocument === 'Tax Planning Memorandum' ? (
                        <div className="text-sm space-y-4">
                          <p><strong>To:</strong> Management, ABC Consulting, Inc.</p>
                          <p><strong>From:</strong> NextWaveWinner US LLP</p>
                          <p><strong>Date:</strong> December 31, 2024</p>
                          <p><strong>Subject:</strong> Year-End Tax Planning Considerations for ABC Consulting, Inc.</p>

                          <h4 className="font-bold mt-4">Background</h4>
                          <p>
                            ABC Consulting, Inc. is a professional services firm providing advisory support to small and mid-sized businesses. For the year ended December 31, 2024, the company generated approximately $40,000 in service revenue and reported net income before tax of approximately $7,800 (per preliminary trial balance). As the company approaches year-end, several planning opportunities and compliance considerations have been identified to optimize its tax position and mitigate potential risks.
                          </p>
                          
                          <h4 className="font-bold mt-4">Key Observations and Planning Opportunities</h4>
                          
                          <h5 className="font-semibold mt-2">Payroll Accrual Mismatch</h5>
                          <p className="bg-orange-200 p-2 rounded-md">
                            Trial balance reflects $4,200 in salaries payable, while payroll records support $3,785, resulting in a variance of $415.
                          </p>
                          <p>
                            <strong>Recommendation:</strong> Confirm whether the variance is attributable to unrecorded holiday/overtime pay or an over-accrual. Adjust as appropriate to avoid overstating deductible compensation. This ensures compliance with IRS regulations on timing of wage deductions under IRC §461.
                          </p>

                          <h5 className="font-semibold mt-2">Fixed Asset Depreciation</h5>
                          <p>
                            Company has recorded $15,000 in furniture and equipment with accumulated depreciation of $3,000.
                          </p>
                          <p>
                            <strong>Recommendation:</strong> Consider whether assets qualify for Section 179 expensing or 100% bonus depreciation to accelerate deductions. This could provide an immediate tax benefit in 2024, depending on projected taxable income.
                          </p>
                          
                          <h5 className="font-semibold mt-2">Prepaid Expenses and Supplies</h5>
                          <p>
                            Trial balance shows $2,000 in prepaid expenses and $1,200 in office supplies.
                          </p>
                          <p>
                            <strong>Recommendation:</strong> Review whether these amounts qualify for current-year deduction under the 12-month rule and de minimis safe harbor. Expensing prepaid and supply costs may reduce taxable income for 2024.
                          </p>
                        </div>
                      ) : selectedDocument === 'Trial Balance' ? (
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
          ref={chatPanelRef}
          className={`fixed top-11 right-0 h-full bg-slate-50/80 backdrop-blur-sm border-l transition-transform duration-300 ${
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
            <div className="flex-grow p-4 bg-muted/80 rounded-lg my-4 space-y-4 overflow-y-auto">
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
       <AlertDialog open={isOpportunityAnalysisOpen} onOpenChange={setIsOpportunityAnalysisOpen}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <div>
                <AlertDialogTitle className="text-[11px] font-semibold tracking-wider uppercase text-black/60 pb-2.5 mb-1 border-b border-black/5">Opportunity Analysis</AlertDialogTitle>
                <h2 className="text-base font-semibold text-black/90">ABC Consulting LLC – SALT Review 2025</h2>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">Credits & Incentives</Badge>
                <Badge variant="default">Qualified</Badge>
                <Badge variant={"secondary"}>Medium Risk</Badge>
              </div>
            </div>
          </AlertDialogHeader>
          <OpportunityAnalysisContent />
          <AlertDialogCancel className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground p-1 h-auto border-0 focus-visible:ring-0 focus-visible:ring-offset-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

    

    

