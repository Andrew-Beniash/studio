
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ContactCardProps = {
  name: string;
  role: string;
  phone: string;
  imageUrl: string;
};

export function ContactCard({ name, role, phone, imageUrl }: ContactCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <Avatar className="w-20 h-20 mb-4">
        <Image src={imageUrl} alt={name} width={80} height={80} className="object-cover" />
      </Avatar>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-muted-foreground">{role}</p>
      <p className="text-sm text-muted-foreground mt-2">{phone}</p>
      <Button className="mt-4 w-full bg-[#4b5563] text-white">Contact in MS Teams</Button>
    </div>
  );
}

    