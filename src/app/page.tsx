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
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 flex flex-col gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Deliverables</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Content for Deliverables */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Document Intake and Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Content for Document Intake and Checklist */}
                </CardContent>
              </Card>
            </div>
            <div className="col-span-2">
              {/* This will be the main content area on the right */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
