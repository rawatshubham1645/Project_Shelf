import React from "react";
import { Card } from "../../../../ui/card";
import { Label } from "../../../../ui/label";
import { Input } from "../../../../ui/input";
import { Button } from "../../../../ui/button";
import { Checkbox } from "../../../../ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/select";

export function FieldEditor({ field, formFields = [], onUpdate }) {
  const handleLabelChange = (e) => {
    const value = e.target.value;
    onUpdate(field.id, { label: value });
  };

  const handlePlaceholderChange = (e) => {
    const value = e.target.value;
    onUpdate(field.id, { placeholder: value });
  };

  const handleRequiredChange = (checked) => {
    onUpdate(field.id, { required: checked });
  };

  const handleOptionChange = (index, updatedOption) => {
    // Validate the option
    // if (!updatedOption.value && !updatedOption.label) {
    //   return; // Don't update if both value and label are empty
    // }

    // If value is empty but label exists, use label as value
    // if (!updatedOption.value && updatedOption.label) {
    //   updatedOption.value = updatedOption.label;
    // }

    onUpdate(field.id, {
      options: field.options.map((opt, i) =>
        i === index ? updatedOption : opt
      ),
    });
  };

  const handleAddOption = () => {
    const newOption = { label: "", value: "" };
    const currentOptions = field.options || [];

    onUpdate(field.id, {
      options: [...currentOptions, newOption],
    });
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...(field.options || [])].filter((_, i) => i !== index);
    onUpdate(field.id, { options: newOptions });
  };

  const handleConditionalChange = (checked) => {
    if(checked){
      handleRequiredChange(false)
    }
    onUpdate(field.id, {
      conditional: {
        enabled: checked,
        dependsOn: field.conditional?.dependsOn || "",
        value: field.conditional?.value || "",
      },
    });
  };

  const handleDependsOnChange = (value) => {
    console.log("Updating conditional dependsOn:", {
      fieldId: field.id,
      value,
    });
    onUpdate(field.id, {
      conditional: {
        enabled: true,
        dependsOn: value,
        value: field.conditional?.value || "",
      },
    });
  };

  const handleValueChange = (e) => {
    const value = e.target.value;
    console.log("Updating conditional value:", { fieldId: field.id, value });
    onUpdate(field.id, {
      conditional: {
        enabled: true,
        dependsOn: field.conditional?.dependsOn || "",
        value: value,
      },
    });
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Field Label</Label>
          <Input
            value={field.label || ""}
            onChange={handleLabelChange}
            placeholder="Enter field label"
            className="w-full"
          />
        </div>

        {field.type !== "rating" && field.type !== "checkbox" && (
          <div className="space-y-2">
            <Label>Placeholder Text</Label>
            <Input
              value={field.placeholder || ""}
              onChange={handlePlaceholderChange}
              placeholder="Enter placeholder text"
              className="w-full"
            />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id={`required-${field.id}`}
          checked={field.required || false}
          onCheckedChange={handleRequiredChange}
        />
        <Label htmlFor={`required-${field.id}`} className="cursor-pointer">
          Required field
        </Label>
      </div>

      {field.type === "dropdown" && (
        <div className="space-y-2">
          <Label>Options</Label>
          <div className="space-y-2">
            {(field.options || []).map((option, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      value={option.label || ""}
                      onChange={(e) =>
                        handleOptionChange(index, {
                          ...option,
                          label: e.target.value,
                        })
                      }
                      placeholder="Option label"
                      className="w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      value={option.value || ""}
                      onChange={(e) =>
                        handleOptionChange(index, {
                          ...option,
                          value: e.target.value,
                        })
                      }
                      placeholder="Option value"
                      className="w-full"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteOption(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {!option.value?.trim() ||
                  (!option.label?.trim() && (
                    <div className="text-sm text-red-500">
                      Please enter valid label and value for this option
                    </div>
                  ))}
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleAddOption}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Conditional Logic</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`conditional-${field.id}`}
              checked={field.conditional?.enabled || false}
              onCheckedChange={handleConditionalChange}
            />
            <Label
              htmlFor={`conditional-${field.id}`}
              className="cursor-pointer"
            >
              Show this field based on another field's value
            </Label>
          </div>
        </div>

        {field.conditional?.enabled && (
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <Label>Depends on field</Label>
              <Select
                value={field.conditional?.dependsOn || "no-fields"}
                onValueChange={handleDependsOnChange}
                disabled={!formFields?.some((f) => f.id !== field.id)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a field to depend on" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {(formFields || []).length > 0 ? (
                      (formFields || [])
                        .filter((f) => f.id !== field.id)
                        .map((f) => {
                          // Create a readable field name
                          const fieldName =
                            f.label ||
                            (f.type === "dropdown" && f.options?.length > 0
                              ? `Dropdown (${f.options
                                  .filter((opt) => {
                                    const value =
                                      typeof opt === "string" ? opt : opt.value;
                                    return value && value.length > 0;
                                  })
                                  .map((opt) =>
                                    typeof opt === "string"
                                      ? opt
                                      : opt.label || opt.value
                                  )
                                  .join(", ")})`
                              : `${
                                  f.type.charAt(0).toUpperCase() +
                                  f.type.slice(1)
                                } field`);

                          return (
                            <SelectItem key={f.id} value={f.id}>
                              {fieldName}
                            </SelectItem>
                          );
                        })
                    ) : (
                      <SelectItem value="no-fields" disabled>
                        No other fields available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Show when value equals</Label>
              <Input
                disabled={!field.conditional?.dependsOn}
                placeholder="Enter value to match"
                value={field.conditional?.value || ""}
                onChange={handleValueChange}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
