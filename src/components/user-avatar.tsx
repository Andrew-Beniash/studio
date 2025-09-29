"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

type UserAvatarProps = {
  avatarUrl: string | null;
};

export function UserAvatar({ avatarUrl }: UserAvatarProps) {
  return (
    <Avatar className="h-12 w-12 border-2 border-background shadow-lg">
      <AvatarImage src={avatarUrl || undefined} alt="User Avatar" />
      <AvatarFallback>
        <User className="h-6 w-6 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
}
