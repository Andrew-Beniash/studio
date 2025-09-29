"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Wand2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateAvatarAction } from "@/app/actions";
import { profileSchema } from "@/app/schemas";
import { Textarea } from "@/components/ui/textarea";

type ProfileFormProps = {
  onImageGenerated: (url: string) => void;
};

export function ProfileForm({ onImageGenerated }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      occupation: "",
      interests: "",
      style: "",
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    startTransition(async () => {
      const result = await generateAvatarAction(values);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.error,
        });
      } else if (result.imageUri) {
        onImageGenerated(result.imageUri);
        toast({
          title: "Success!",
          description: "Your new avatar has been generated.",
        });
      }
    });
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Generate Your Avatar</CardTitle>
        <CardDescription>
          Tell us a bit about yourself, and our AI will generate a profile picture that fits your vibe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Software Engineer" {...field} />
                  </FormControl>
                  <FormDescription>What do you do for work?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[100px]" placeholder="e.g., Hiking, photography, playing guitar" {...field} />
                  </FormControl>
                  <FormDescription>What are your hobbies and interests?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Style</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Casual, professional, artistic" {...field} />
                  </FormControl>
                  <FormDescription>How would you describe your style?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full" size="lg">
              {isPending ? "Generating..." : "Generate Avatar"}
              {!isPending && <Wand2 className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
