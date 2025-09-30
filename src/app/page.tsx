"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/header";

const tasks = [
  {
    id: 1,
    title: "Finalize Q3 Tax Filings",
    customerName: "Innovate Inc.",
    priority: "High",
    dueDate: "2024-09-15",
  },
  {
    id: 2,
    title: "Review Deductible Expenses",
    customerName: "John Smith",
    priority: "Medium",
    dueDate: "2024-09-20",
  },
  {
    id: 3,
    title: "Prepare Annual Financial Statement",
    customerName: "Global Exports LLC",
    priority: "High",
    dueDate: "2024-09-30",
  },
  {
    id: 4,
    title: "Consultation on R&D Tax Credits",
    customerName: "Tech Solutions Co.",
    priority: "Low",
    dueDate: "2024-10-05",
  },
  {
    id: 5,
    title: "Address IRS Notice CP2000",
    customerName: "Emily White",
    priority: "High",
    dueDate: "2024-09-12",
  },
  {
    id: 6,
    title: "State and Local Tax Compliance Check",
    customerName: "Retail Goods Inc.",
    priority: "Medium",
    dueDate: "2024-10-15",
  },
];

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

export default function Home() {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleTaskClick = (taskId: number) => {
    setSelectedTaskId(taskId);
  };

  const handleTitleClick = () => {
    setSelectedTaskId(null);
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
          <div>
            {/* Blank content area */}
          </div>
        )}
      </main>
    </div>
  );
}
