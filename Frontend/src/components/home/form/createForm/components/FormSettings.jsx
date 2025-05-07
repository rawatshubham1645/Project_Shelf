import React from "react";
import { Card } from "../../../../ui/card";
import { Label } from "../../../../ui/label";
import { Input, PasswordInput } from "../../../../ui/input";
// import { Switch } from '../../../../ui/switch';
import { Button } from "../../../../ui/button";
import { Calendar } from "../../../../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../ui/popover";
import { CalendarIcon, Copy } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DateTimePicker from "@/components/ui/dateTimePicker";

export function FormSettings({ settings, onUpdate }) {
  const handleStatusChange = (value) => {
    onUpdate({ status: value });
  };

  const handleScheduledDateChange = (date) => {
    onUpdate({ scheduledDate: date });
  };

  const handlePasswordChange = (e) => {
    onUpdate({ password: e.target.value });
  };

  const handleWebhookUrlChange = (e) => {
    onUpdate({ webhookUrl: e.target.value });
  };
  const handleTitleChange = (e) => {
    onUpdate({ title: e.target.value });
  };

  const copyUrl = () => {
    if (settings.uniqueUrl) {
      navigator.clipboard.writeText(settings.uniqueUrl);
    }
  };

  return (
    <Card className="p-4 space-y-6">
      <div className="space-y-2">
        <Label>Form Title</Label>
        <Input
          value={settings.title || ""}
          onChange={handleTitleChange}
          placeholder="Enter Form Title"
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label>Form Status</Label>
        <Select value={settings.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {settings.status === "scheduled" && (
        <div className="space-y-2">
          <Label>Scheduled Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !settings.scheduledDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {settings.scheduledDate ? (
                  format(settings.scheduledDate, "PPP")
                ) : (
                  <span>Pick a date & time</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              {/* <DateTimePicker
                mode="single"
                selected={settings.scheduledDate}
                onSelect={handleScheduledDateChange}
                initialFocus
              /> */}
              <DateTimePicker
                date={settings.scheduledDate}
                setDate={handleScheduledDateChange}
                className="w-full"
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="space-y-2">
        <Label>Unique URL</Label>
        <div className="flex space-x-2">
          <Input
            value={settings.uniqueUrl || ""}
            readOnly
            className="flex-1"
            placeholder="URL will be generated when form is saved"
          />
          <Button variant="outline" size="icon" onClick={copyUrl}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Respondent Password</Label>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <PasswordInput
              value={settings.password || ""}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Webhook URL</Label>
        <Input
          type="url"
          value={settings.webhookUrl || ""}
          onChange={handleWebhookUrlChange}
          placeholder="Enter webhook URL for form submissions"
          className="w-full"
        />
      </div>
    </Card>
  );
}
