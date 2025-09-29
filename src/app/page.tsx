"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { ProfileForm } from "@/components/profile-form";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const defaultAvatar = PlaceHolderImages.find(img => img.id === 'default-avatar');
    if (defaultAvatar) {
      setAvatarUrl(defaultAvatar.imageUrl);
    }
  }, []);

  const handleImageGenerated = (url: string) => {
    setAvatarUrl(url);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header avatarUrl={avatarUrl} />
      <main className="flex-grow pt-28 pb-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileForm onImageGenerated={handleImageGenerated} />
      </main>
    </div>
  );
}
