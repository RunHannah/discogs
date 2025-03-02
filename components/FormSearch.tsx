"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchema } from "@/lib/formSchema";

interface FormProps {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export default function SearchForm({ onSubmit }: FormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmitHandler = async (values: z.infer<typeof FormSchema>) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="w-full max-w-[850px] flex flex-col md:flex-row justify-center items-center p-2 text-white"
      >
        <div className="w-full flex flex-col md:flex-row items-center md:items-end">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="ml-3 mr-3 w-full">
                <FormControl>
                  <Input
                    className="rounded-none"
                    type="text"
                    placeholder="artist, album, track, genre, year, format..."
                    {...form.register("query")}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {form.formState.errors.query?.message && (
            <p className="text-red-500 text-sm mt-2">
              {form.formState.errors.query.message}
            </p>
          )}
          <Button
            className="rounded-none text-black w-auto md:w-40 bg-orange-200 mt-4 md:mt-0 hover:bg-yellow-600 hover:text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
