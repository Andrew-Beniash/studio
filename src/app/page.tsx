"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/header";
import { tasks } from "@/lib/tasks";

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

const deliverables = ["Tax Planning Memorandum", "After-Tax Savings Schedule", "Presentation"];
const documents = ["Tax Returns 2024", "Trial Balance", "Fixed Asset Register", "Payroll Records", "State Appointment Data", "Forecasts and Budget"];

export default function Home() {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header onTitleClick={handleTitleClick} />
      <main className="flex-grow pt-16 pb-12 container mx-auto px-4 sm:px-6 lg:px-8">
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
                      <Badge variant={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                      <p className="text-sm">{task.dueDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 flex flex-col gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Deliverables</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    {deliverables.map((doc) => (
                      <li key={doc} onClick={() => handleDocumentClick(doc)} className="cursor-pointer hover:underline">
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
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                     {documents.map((doc) => (
                      <li key={doc} onClick={() => handleDocumentClick(doc)} className="cursor-pointer hover:underline">
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-2">
              {selectedDocument && (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedDocument}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Content for {selectedDocument} will be displayed here.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
