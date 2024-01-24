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
import { stringToArray } from "@/lib/string";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().refine(validator.isMobilePhone, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().optional(),
  interests: z.string().optional(),
});

export default function VolunteerSignup() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      interests: "",
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
      <h1>Volunteer Signup</h1>
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Tasnimul Hasan" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your full name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tauhid@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Official Phone Number (with country code)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+919106XXXXXX" type="tel" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your phone number.
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
                  <FormLabel>Address </FormLabel>
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
                  <FormDescription>Please enter your address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="
                      Health Care,
                      Education,
                      Web Development"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your interests. (comma separated)
                  </FormDescription>
                  <FormMessage />
                  <p>
                    {stringToArray(field.value).map((item) => {
                      return (
                        <span
                          key={item}
                          className="bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700 mr-2"
                        >
                          {item}
                        </span>
                      );
                    })}
                  </p>
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
