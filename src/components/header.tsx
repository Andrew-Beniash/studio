
"use client";

import { Bell, Settings, ChevronDown, Search } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

type HeaderProps = {
  onTitleClick?: () => void;
  selectedTask?: Task | null;
  onOpportunityAnalysisClick?: () => void;
};

export function Header({ onTitleClick, selectedTask, onOpportunityAnalysisClick }: HeaderProps) {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#78BE20] to-[#00A9CE] shadow-md">
      <div className="flex h-11 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center gap-2">
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
              <DropdownMenuContent className="w-80 bg-background/80 backdrop-blur-sm p-0">
                <div className="p-2 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="search across client data" className="pl-8" />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>QUICK LINKS</DropdownMenuLabel>
                <DropdownMenuItem className="pl-9">
                  <span>Customer Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="pl-9">
                  <span>PY 2023 Documents</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="pl-9">
                  <span>Contracts</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="pl-9" onSelect={onOpportunityAnalysisClick}>
                  <span>Opportunity Analysis</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <Bell className="h-4 w-4 text-white" />
          <Dialog>
            <DialogTrigger asChild>
              <Settings className="h-4 w-4 text-white cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>
                  Manage your account settings and preferences.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-3">
                  <Label>Theme</Label>
                  <RadioGroup defaultValue="light" className="flex gap-4">
                    <div>
                      <RadioGroupItem value="light" id="light" className="peer sr-only" />
                      <Label htmlFor="light" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Light
                      </Label>
                    </div>
                     <div>
                      <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                      <Label htmlFor="dark" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Dark
                      </Label>
                    </div>
                     <div>
                      <RadioGroupItem value="system" id="system" className="peer sr-only" />
                      <Label htmlFor="system" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <Switch id="notifications" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
