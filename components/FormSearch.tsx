"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FormSchema } from "@/app/lib/formSchema";

interface FormProps {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export default function SearchForm({ onSubmit }: FormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      artist: "",
      release_title: "",
      genre: "",
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
        className="w-full max-w-[1350px] flex flex-col md:flex-row justify-between md:items-center p-2 text-purple-950"
      >
        <div className="flex flex-col md:flex-row">
          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem className="ml-5 mr-5">
                <FormLabel>Artist</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="pj harvey"
                    {...form.register("artist")}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-purple-950">
                  Search by Artist
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="release_title"
            render={({ field }) => (
              <FormItem className="ml-5 mr-5">
                <FormLabel>Release Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="is this desire"
                    {...form.register("release_title")}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-purple-950">
                  Search by Release Title
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="ml-5 mr-5">
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="rock"
                    {...form.register("genre")}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-purple-950">
                  Search by Genre
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.artist?.message && (
            <p className="text-purple-9500 text-sm mt-2">
              {form.formState.errors.artist.message}
            </p>
          )}
        </div>
        <Button
          className="text-purple-950 w-40 bg-slate-300 mt-4 md:mt-0 hover:bg-slate-400"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Searching..." : "Search"}
        </Button>
      </form>
    </Form>
  );
}
