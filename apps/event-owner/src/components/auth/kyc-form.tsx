import { useState, useRef } from "react";
import useClickAway from "react-use/esm/useClickAway";
import {
  Button,
  DatePicker,
  DateRenderer,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@laevento/components";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { KycFormData } from "@/types";
import { kycSchema } from "@/schemas/auth";
import { useSubmitKyc } from "@/hooks/auth";

export function KycForm() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const { mutate } = useSubmitKyc();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<KycFormData>({
    resolver: yupResolver(kycSchema),
    defaultValues: {
      username: "",
      fullName: "",
      about: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  // Close DatePicker when clicking outside
  useClickAway(datePickerRef, () => {
    setIsDatePickerOpen(false);
  });

  const handleDateRendererClick = () => {
    setIsDatePickerOpen(true);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, " - ");
  };

  const onSubmit: SubmitHandler<KycFormData> = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-8 mt-6"
    >
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input.Root>
            <Input.Label required htmlFor="username">
              Choose a username
            </Input.Label>
            <Input.Field
              {...field}
              id="username"
              type="text"
              placeholder="@user_name"
            />
            {errors.username && (
              <Input.Error>{errors.username.message}</Input.Error>
            )}
          </Input.Root>
        )}
      />

      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <Input.Root>
            <Input.Label required htmlFor="fullname">
              Full Name
            </Input.Label>
            <Input.Field
              {...field}
              id="fullname"
              type="text"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <Input.Error>{errors.fullName.message}</Input.Error>
            )}
          </Input.Root>
        )}
      />

      <Controller
        name="about"
        control={control}
        render={({ field }) => (
          <Input.Root>
            <Input.Label required htmlFor="about">
              About yourself
            </Input.Label>
            <Input.Field
              {...field}
              id="about"
              type="text"
              placeholder="Tell us about yourself"
            />
            {errors.about && <Input.Error>{errors.about.message}</Input.Error>}
          </Input.Root>
        )}
      />

      <div className="flex flex-row gap-6">
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <div className="relative w-full">
              <DateRenderer
                id="dob"
                label="Date of Birth"
                required
                placeholder="DD - MM - YYYY"
                value={formatDate(selectedDate)}
                onDateClick={handleDateRendererClick}
              />
              {isDatePickerOpen && (
                <div className="absolute z-50 mt-2">
                  <DatePicker
                    ref={datePickerRef}
                    selected={selectedDate}
                    onChange={(date: Date | null) => {
                      setSelectedDate(date);
                      field.onChange(formatDate(date));
                    }}
                  />
                </div>
              )}
              {errors.dateOfBirth && (
                <Input.Error>{errors.dateOfBirth.message}</Input.Error>
              )}
            </div>
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div className="w-full flex flex-col gap-2">
              <Input.Label required htmlFor="gender">
                Gender
              </Input.Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <Input.Error>{errors.gender.message}</Input.Error>
              )}
            </div>
          )}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        width="full"
        buttonText="Finish"
      />
    </form>
  );
}
