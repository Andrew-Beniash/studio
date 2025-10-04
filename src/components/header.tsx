
import { Bell, Settings, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { Task } from "@/lib/tasks";

type HeaderProps = {
  onTitleClick?: () => void;
  selectedTask?: Task | null;
  onOpportunityAnalysisClick?: () => void;
};

export function Header({ onTitleClick, selectedTask, onOpportunityAnalysisClick }: HeaderProps) {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#78BE20] to-[#00A9CE] shadow-md">
      <div className="flex h-11 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center gap-4">
          <h1 
            className="text-white tracking-tight cursor-pointer" 
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: 700, lineHeight: '22px' }}
            onClick={onTitleClick}
          >
            Tax Advisory Platform
          </h1>
        </div>
        
        {selectedTask && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <h2 
                    className="text-white"
                    style={{fontFamily: 'SF Pro, sans-serif', fontWeight: 700, fontSize: '13px', lineHeight: '16px'}}
                  >
                    {selectedTask.customerName} - {selectedTask.title}
                  </h2>
                  <ChevronDown className="h-4 w-4 text-white" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-background/90 backdrop-blur-sm p-0">
                <div className="p-2">
                    <Input placeholder="Search client data" />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>QUICK LINKS</DropdownMenuLabel>
                <DropdownMenuItem>
                  <span>Customer Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>PY 2023 Documents</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Contracts</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onOpportunityAnalysisClick}>
                  <span>Opportunity Analysis</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <Bell className="h-4 w-4 text-white" />
          <Settings className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
}
