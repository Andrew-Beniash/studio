import { Bell, Settings, Menu } from "lucide-react";
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
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#78BE20', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#00A9CE', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M50,0 L100,25 L100,75 L50,100 L0,75 L0,25 Z"
      fill="url(#logoGradient)"
    />
    <path
      d="M50,0 L100,25 L50,50 Z"
      fill="rgba(255, 255, 255, 0.2)"
    />
    <path
      d="M50,100 L100,75 L50,50 Z"
      fill="rgba(0, 0, 0, 0.2)"
    />
    <path
      d="M50,100 L0,75 L50,50 Z"
      fill="rgba(255, 255, 255, 0.2)"
    />
    <path
      d="M50,0 L0,25 L50,50 Z"
      fill="rgba(0, 0, 0, 0.2)"
    />
  </svg>
);


export function Header({ onTitleClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#78BE20] to-[#00A9CE] shadow-md">
      <div className="container mx-auto flex h-11 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="absolute left-[10px] flex items-center space-x-4">
          <SidebarTrigger>
              <Menu className="h-5 w-5 text-white" />
          </SidebarTrigger>
          <h1 
            className="text-white tracking-tight cursor-pointer" 
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: 700, lineHeight: '22px' }}
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
