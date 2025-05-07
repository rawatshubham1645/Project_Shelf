import * as React from "react";
import { useState, useEffect } from "react";
import { ChevronDown, Clock } from "lucide-react";
import { Calendar } from "./calendar";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const DateTimePicker = ({
  date,
  setDate,
  className,
  showTime = true,
  disabled = false,
  ...props
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date || new Date());
  const [hours, setHours] = useState(
    selectedDate ? selectedDate.getHours() : 0
  );
  const [minutes, setMinutes] = useState(
    selectedDate ? selectedDate.getMinutes() : 0
  );
  const containerRef = React.useRef(null);
  // Use a ref to track if we're currently updating to prevent loops
  const isUpdatingRef = React.useRef(false);

  // Sync internal state when the date prop changes
  useEffect(() => {
    if (date && !isUpdatingRef.current) {
      setSelectedDate(date);
      setHours(date.getHours());
      setMinutes(date.getMinutes());
    }
  }, [date]);

  // Update the combined date and time whenever internal values change
  useEffect(() => {
    // Only proceed if we have all the necessary values and are not already updating
    if (selectedDate && !isUpdatingRef.current) {
      const newDate = new Date(selectedDate);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);

      // Set the flag to prevent loops
      isUpdatingRef.current = true;

      // Only call setDate if there's actually a change
      if (
        setDate &&
        (!date || Math.abs(newDate.getTime() - date.getTime()) > 100)
      ) {
        setDate(newDate);
      }

      // Reset the flag after a short delay
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);
    }
  }, [selectedDate, hours, minutes]);

  // Handle click outside to close the calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTimeChange = (type, value) => {
    const numValue = parseInt(value, 10);
    if (type === "hours") {
      setHours(numValue >= 0 && numValue <= 23 ? numValue : 0);
    } else {
      setMinutes(numValue >= 0 && numValue <= 59 ? numValue : 0);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let formattedDate = `${month}/${day}/${year}`;

    if (showTime) {
      const hoursDisplay = date.getHours().toString().padStart(2, "0");
      const minutesDisplay = date.getMinutes().toString().padStart(2, "0");
      formattedDate += ` ${hoursDisplay}:${minutesDisplay}`;
    }

    return formattedDate;
  };

  // Handle date selection with time preservation
  const handleDateSelect = (newDate) => {
    if (newDate) {
      const dateWithTime = new Date(newDate);
      dateWithTime.setHours(hours);
      dateWithTime.setMinutes(minutes);
      setSelectedDate(dateWithTime);
    }
  };

  // Handle apply button click
  const handleApply = () => {
    setIsCalendarOpen(false);

    // Ensure we update the parent with the final state
    if (setDate && selectedDate) {
      const finalDate = new Date(selectedDate);
      finalDate.setHours(hours);
      finalDate.setMinutes(minutes);
      setDate(finalDate);
    }
  };

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
        onClick={() => !disabled && setIsCalendarOpen(!isCalendarOpen)}
        disabled={disabled}
      >
        <div className="flex-1 flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-500" />
          <span>
            {selectedDate ? formatDate(selectedDate) : "Select date & time"}
          </span>
        </div>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </Button>

      {/* Calendar dropdown - positioned above the input */}
      {isCalendarOpen && (
        <div
          className="absolute z-50 bottom-full mb-2 bg-white border rounded-lg shadow-lg w-fit min-w-[320px]"
          style={{ maxWidth: "calc(100vw - 2rem)" }}
        >
          <div className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />

            {/* Time picker */}
            {showTime && (
              <div className="mt-4 border-t pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Set time:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={hours}
                      onChange={(e) =>
                        handleTimeChange("hours", e.target.value)
                      }
                      onBlur={(e) => {
                        const val = parseInt(e.target.value);
                        if (isNaN(val) || val < 0) setHours(0);
                        else if (val > 23) setHours(23);
                      }}
                      className="w-14 px-2 py-1 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-slate-400"
                      aria-label="Hours"
                    />
                    <span className="text-xl font-medium">:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) =>
                        handleTimeChange("minutes", e.target.value)
                      }
                      onBlur={(e) => {
                        const val = parseInt(e.target.value);
                        if (isNaN(val) || val < 0) setMinutes(0);
                        else if (val > 59) setMinutes(59);
                      }}
                      className="w-14 px-2 py-1 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:border-slate-400"
                      aria-label="Minutes"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCalendarOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="button" size="sm" onClick={handleApply}>
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
