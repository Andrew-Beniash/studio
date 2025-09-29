import { UserAvatar } from "./user-avatar";

type HeaderProps = {
  avatarUrl: string | null;
};

export function Header({ avatarUrl }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#EAF4F8] dark:bg-slate-900/80 shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-primary tracking-tight font-headline">
          Profile Header
        </h1>
        <div className="absolute right-[10px]">
          <UserAvatar avatarUrl={avatarUrl} />
        </div>
      </div>
    </header>
  );
}
