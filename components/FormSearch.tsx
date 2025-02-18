"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FormSchema } from "@/lib/formSchema";

interface FormProps {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export default function SearchForm({ onSubmit }: FormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      artist: "",
      releaseTitle: "",
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
        className="w-full max-w-[850px] flex flex-col md:flex-row justify-center items-center p-2 text-white"
      >
        <div className="flex flex-col md:flex-row items-center md:items-end">
          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem className="ml-3 mr-3">
                <FormLabel>Artist</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none"
                    type="text"
                    placeholder="Aqua"
                    {...form.register("artist")}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="releaseTitle"
            render={({ field }) => (
              <FormItem className="ml-3 mr-3">
                <FormLabel>Release Title</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none"
                    placeholder="Aquarium"
                    {...form.register("releaseTitle")}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="ml-3 mr-3">
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none"
                    placeholder="Pop"
                    {...form.register("genre")}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {form.formState.errors.artist?.message && (
            <p className="text-red-500 text-sm mt-2">
              {form.formState.errors.artist.message}
            </p>
          )}
          <Button
            className="rounded-none text-purple-950 w-auto md:w-40 bg-slate-300 mt-4 md:mt-0 hover:bg-slate-400"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
