import { Bell, Settings } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

type HeaderProps = {
  onTitleClick?: () => void;
};

const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="#29B6F6" />
    <polygon points="50,0 100,25 50,50" fill="#0288D1" />
    <polygon points="50,100 100,75 50,50" fill="#424242" />
    <polygon points="50,100 0,75 50,50" fill="#66BB6A" />
    <polygon points="50,0 0,25 50,50" fill="#43A047" />
  </svg>
);


export function Header({ onTitleClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-700 to-slate-500 shadow-md">
      <div className="container mx-auto flex h-11 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="absolute left-[10px] flex items-center space-x-4">
          <SidebarTrigger>
              <Logo />
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
