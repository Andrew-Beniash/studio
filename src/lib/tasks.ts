
export type Task = {
  id: number;
  title: string;
  customerName: string;
  priority: string;
  dueDate: string;
};

export const tasks: Task[] = [
  {
    id: 1,
    title: "State Nexus Analysis 2024",
    customerName: "ABC Consulting LLC",
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
