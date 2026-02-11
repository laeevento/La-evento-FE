"use client";

import { useState, useRef } from "react";
import { useClickAway } from "react-use";
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

export function KycForm() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Close DatePicker when clicking outside
  useClickAway(datePickerRef, () => {
    setIsDatePickerOpen(false);
  });

  const handleDateRendererClick = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
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

  return (
    <form className="w-full flex flex-col gap-8 mt-6">
      <Input.Root>
        <Input.Label required htmlFor="username">
          Choose a username
        </Input.Label>
        <Input.Field id="username" type="text" placeholder="@user_name" />
      </Input.Root>
      <Input.Root>
        <Input.Label required htmlFor="fullname">
          Full Name
        </Input.Label>
        <Input.Field
          id="fullname"
          type="text"
          placeholder="Enter your full name"
        />
      </Input.Root>
      <Input.Root>
        <Input.Label required htmlFor="about">
          About yourself
        </Input.Label>
        <Input.Field
          id="about"
          type="text"
          placeholder="Tell us about yourself"
        />
      </Input.Root>
      <div className="flex flex-row gap-6">
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
                onChange={handleDateChange}
              />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <Input.Label required htmlFor="gender">
            Gender
          </Input.Label>
          <Select>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button variant="primary" size="lg" width="full" buttonText="Finish" />
    </form>
  );
}
