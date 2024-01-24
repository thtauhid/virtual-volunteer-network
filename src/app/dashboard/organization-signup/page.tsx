"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import validator from "validator";

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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  official_email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  official_phone: z.string().refine(validator.isMobilePhone, {
    message: "Please enter a valid phone number.",
  }),

  address: z.string().min(10, {
    message: "Please enter a valid address.",
  }),
});

export default function OrganizationSignup() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      official_email: "",
      official_phone: "",
      address: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="p-4 m-4 border">
      <h1>Organization Signup</h1>
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC Foundation" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter the official name of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="official_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Official Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="info@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter the official email of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="official_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Official Phone Number (with country code)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+919106XXXXXX" type="tel" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter the official phone number of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Official Address </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="
                    123, ABC Street,
                    City,
                    State,
                    Country,
                    PIN Code
                    "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter the official address of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
