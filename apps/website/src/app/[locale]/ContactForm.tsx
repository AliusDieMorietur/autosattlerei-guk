"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const ContactForm = () => {
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
    description: z.string().max(500, t("error.Max500Description")),
    photos: z
      .array(z.any())
      .refine((photos: File[]) => photos.length <= 2, t("error.Max2Photos"))
      .refine((photos: File[]) => {
        for (const photo of photos) {
          if (photo.size > 5 * 1024 * 1024) {
            return false;
          }
          if (!["image/png", "image/jpeg", "image/jpg"].includes(photo.type)) {
            return false;
          }
        }
        return true;
      }, t("error.InvalidPhotoTypes")),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
      photos: [],
    },
  });

  const photos = form.watch("photos");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("description", values.description);
    for (const photo of values.photos) {
      formData.append("photos", photo);
    }

    const data = await fetch("/api/contact/submit", {
      method: "POST",
      body: formData,
    });

    console.log("data", await data.text());
  };

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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("label.Description")} ({t("label.Optional")})
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("placeholder.EnterDescription")}
                    className="resize-none h-[100px]"
                    {...field}
                  />
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