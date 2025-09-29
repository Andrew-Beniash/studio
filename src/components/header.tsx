import { UserAvatar } from "./user-avatar";
import { Bell, Mountain } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

type HeaderProps = {
  avatarUrl: string | null;
};

export function Header({ avatarUrl }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#63666a] dark:bg-[#63666a] shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="absolute left-[10px] flex items-center space-x-4">
          <SidebarTrigger>
              <Mountain className="h-8 w-8 text-primary" />
          </SidebarTrigger>
          <h1 className="text-2xl font-bold text-primary tracking-tight font-headline">
            Profile Header
          </h1>
        </div>
        <div className="absolute right-[10px] flex items-center space-x-4">
          <Bell className="h-6 w-6 text-foreground" />
          <UserAvatar avatarUrl={avatarUrl} />
        </div>
      </div>
    </header>
  );
}
