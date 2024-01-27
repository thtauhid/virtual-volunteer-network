"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Workspace title must be at least 2 characters long.",
  }),

  details: z.string().min(2, {
    message: "Workspace details must be at least 2 characters long.",
  }),
});

export default function CreateWorkspace() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      details: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await fetch("/api/organization/workspaces", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const resultJson = await result.json();

    if (result.ok) {
      toast({
        title: "Workspace Created",
        description: "Workspace created successfully",
      });
      router.push("/organization/workspaces/" + resultJson.data.id);
    } else {
      toast({
        title: "Failed",
        description: "Unable to create workspace",
        action: (
          <ToastAction
            altText="Go Back To Workspaces"
            onClick={() => router.push("/organization/workspaces")}
          >
            Go Back To Workspaces
          </ToastAction>
        ),
      });
    }
  }

  return (
    <div className="p-4 m-4 border">
      <h1>Create Workspace</h1>
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Volunteer Needed for Medical Camp"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter the title of your workspace.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Details <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="We are looking for volunteers to help us with our medical camp. We need volunteers to help with registration, guiding patients, and other tasks."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter some details about your workspace.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Complex input for duration. 1 day / 15 days / 1 month / 1 year */}
            <Button type="submit">Create Workspace</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
