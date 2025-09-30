import { Bell, Diamond, Settings } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

type HeaderProps = {
  onTitleClick?: () => void;
};

export function Header({ onTitleClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#63666a] dark:bg-[#63666a] shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex h-11 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="absolute left-[10px] flex items-center space-x-4">
          <SidebarTrigger>
              <Diamond className="h-8 w-8" color="white" />
          </SidebarTrigger>
          <h1 
            className="text-sm font-bold text-white tracking-tight cursor-pointer" 
            style={{ fontFamily: 'Arial', fontSize: '14px' }}
            onClick={onTitleClick}
          >
            Tax Advisory Platform
          </h1>
        </div>
        <div className="absolute right-[10px] flex items-center space-x-4">
          <Bell className="h-4 w-4 text-white" />
          <Settings className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
}
