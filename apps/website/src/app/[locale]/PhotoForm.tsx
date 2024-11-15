"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { fileListToArray } from "@/lib/utils";
import { X } from "lucide-react";

export const PhotoForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations();
  const formSchema = z.object({
    name: z.string().min(2, t("error.NameMin2")).max(50, t("error.NameMax50")),
    email: z.string().email(t("error.InvalidEmail")),
    phone: z
      .string()
      .regex(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        t("error.InvalidPhone")
      )
      .or(z.string().max(0)),
    photos: z.array(z.any()).refine((data) => {
      console.log("data", data);
      return true;
    }),
    // .instanceof(File)
    // .refine((file) => file.size <= 5 * 1024 * 1024, {
    //   message: "File size must be under 5MB",
    // })
    // .refine(
    //   (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
    //   {
    //     message: "Only PNG, JPG or JPEG files are allowed",
    //   }
    // ),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      photos: [],
    },
  });

  const photos = form.watch("photos");

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    for (const photo of values.photos) {
      formData.append("photos", photo);
    }
  }

  return (
    <div className="p-4 my-4 bg-c9 rounded text-c7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("label.Name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholder.EnterName")} {...field} />
                </FormControl>
                <FormMessage className="text-c10" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("label.Email")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholder.EnterEmail")} {...field} />
                </FormControl>
                <FormMessage className="text-c10" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("label.Phone")} ({t("label.Optional")})
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholder.EnterPhone")} {...field} />
                </FormControl>
                <FormMessage className="text-c10" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    {t("label.Photos")} ({t("label.Optional")})
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    {photos.map((file: File, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <div>{file.name}</div>
                        <Button
                          className="w-fit"
                          variant="black"
                          size="sm"
                          onClick={() => {
                            form.setValue(
                              "photos",
                              photos.filter((_, _index) => _index !== index)
                            );
                          }}
                        >
                          <X />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Input
                    id="photos"
                    className="hidden"
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    multiple
                    onChange={(e) => {
                      const photos = form.getValues("photos");
                      form.setValue("photos", [
                        ...photos,
                        ...Array.from(e.target.files || []),
                      ]);
                    }}
                  />
                  <Button
                    className="w-fit"
                    variant="black"
                    onClick={() => document.getElementById("photos")?.click()}
                  >
                    +
                  </Button>
                  <FormMessage className="text-c10" />
                </FormItem>
              );
            }}
          />
          <Button type="submit" variant="black">
            {t("button.Submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
};
