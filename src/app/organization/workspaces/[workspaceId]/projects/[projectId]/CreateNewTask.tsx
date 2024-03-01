"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name should be at least 3 characters long",
  }),
  details: z.string(),
});

type Props = {
  projectId: number;
};

export default function CreateNewTask(props: Props) {
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
    const result = await fetch("/api/organization/workspaces/projects/task", {
      method: "POST",
      body: JSON.stringify({ projectId: props.projectId, ...values }),
    });

    const resultJson = await result.json();

    if (result.ok) {
      toast({
        title: "Task Created",
        description: "Task has been created successfully",
      });

      // Reload after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast({
        title: "Failed",
        description: "Failed to create task",
      });
    }
  }

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Task Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Task Title" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Textarea placeholder="Task Details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
