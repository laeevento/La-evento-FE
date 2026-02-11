"use client";

import * as React from "react";
import ReactDatePicker, {
  DatePickerProps,
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import Stack from "./stack";
import Typography from "./typography";

const DatePickerHeader = ({
  monthDate,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => {
  const monthName = monthDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleDecreaseMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    decreaseMonth();
  };

  const handleIncreaseMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    increaseMonth();
  };

  return (
    <Stack direction="row" justify="between" align="center">
      <button
        onClick={handleDecreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="h-10 cursor-pointer w-10 py-2.25 px-1.75 bg-white place-items-center rounded-[9px] border border-[#DCE0E5] shadow-custom-inset disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        <RiArrowLeftLine />
      </button>
      <Typography weight="medium">{monthName}</Typography>
      <button
        onClick={handleIncreaseMonth}
        disabled={nextMonthButtonDisabled}
        className="h-10 cursor-pointer w-10 py-2.25 px-1.75 bg-white place-items-center rounded-[9px] border border-[#DCE0E5] shadow-custom-inset disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        <RiArrowRightLine />
      </button>
    </Stack>
  );
};

export type CustomDatePickerProps = DatePickerProps & {
  onClick?: () => void;
};

export const DatePicker = React.forwardRef<
  HTMLDivElement,
  CustomDatePickerProps
>((props, ref) => {
  const { onClick, ...datePickerProps } = props;

  return (
    <div ref={ref} onClick={onClick}>
      <ReactDatePicker
        dateFormat="MM/dd/yyyy"
        inline
        isClearable
        calendarClassName="border-none w-full"
        adjustDateOnChange
        renderCustomHeader={(customProps) => (
          <DatePickerHeader {...customProps} />
        )}
        {...datePickerProps}
      />
    </div>
  );
});

DatePicker.displayName = "DatePicker";
