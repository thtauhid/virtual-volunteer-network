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
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

type Props = {
  params: {
    opportunityId: string;
  };
};

const formSchema = z.object({
  message: z.string().optional(),
});

export default function VolunteerSignup(props: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await fetch(`/api/volunteer/opportunity/apply`, {
      method: "POST",
      body: JSON.stringify({
        ...values,
        opportunityId: props.params.opportunityId,
      }),
    });

    if (result.ok) {
      toast({
        title: "Application Successful",
        description: "You have successfully applied to this opportunity",
      });
      router.push(`/volunteer/opportunity/${props.params.opportunityId}`);
    } else {
      toast({
        title: "Application Failed",
        description: "Unable to apply to this opportunity",
        action: (
          <ToastAction
            altText="Go To Opportunity"
            onClick={() =>
              router.push(
                `/volunteer/opportunity/${props.params.opportunityId}`
              )
            }
          >
            Go To Dashboard
          </ToastAction>
        ),
      });
    }
  }

  return (
    <div className="p-4 m-4 border">
      <h1>Apply to Opportunity</h1>
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I am interested in volunteering for this opportunity because..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide a brief cover letter explaining why you are
                    interested in this opportunity.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Apply</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
