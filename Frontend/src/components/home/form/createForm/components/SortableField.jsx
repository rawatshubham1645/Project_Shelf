import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../../../../ui/card";
import { Label } from "../../../../ui/label";
import { Button } from "../../../../ui/button";
import {
  Edit2,
  Eye,
  Trash2,
  GripVertical,
  Type,
  CheckSquare,
  List,
  Star,
} from "lucide-react";

export function SortableField({
  field,
  disabled,
  onEdit,
  onDelete,
  renderField,
  preview,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Function to get icon based on field type
  const getFieldIcon = () => {
    switch (field.type) {
      case "text":
      case "email":
        return <Type className="h-4 w-4" />;
      case "checkbox":
        return <CheckSquare className="h-4 w-4" />;
      case "dropdown":
        return <List className="h-4 w-4" />;
      case "rating":
        return <Star className="h-4 w-4" />;
      default:
        return <Type className="h-4 w-4" />;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="animate-slide-up">
      <Card
        className="rounded-xl p-4 shadow-sm hover:shadow-lg transition-all card-hover overflow-hidden"
        hover={true}
      >
        {/* Field type indicator */}
        <div className="absolute -right-6 -top-6 w-16 h-16 dark:bg-primary/10 bg-primary/5 rounded-full flex items-center justify-center transform rotate-12"></div>

        <div className="flex flex-col">
          {/* Field header with drag handle and actions */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-3">
              {!disabled && !preview && (
                <div
                  {...attributes}
                  {...listeners}
                  className="cursor-grab hover:bg-accent/50 p-2 rounded-lg transition-colors"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
              )}

              <div className="dark:bg-primary/10 bg-primary/5 rounded-full p-1.5">
                {getFieldIcon()}
              </div>

              <span className="font-medium text-sm text-muted-foreground">
                {field.type.charAt(0).toUpperCase() + field.type.slice(1)} Field
              </span>

              {field.required && (
                <span className="text-[10px] dark:bg-primary/10 bg-primary/5 text-primary px-2 py-0.5 rounded-full font-medium">
                  Required
                </span>
              )}
            </div>

            {!disabled && !preview && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onEdit}
                  className="hover:bg-accent/50 hover:text-primary rounded-lg h-8 w-8"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  className="hover:bg-destructive/10 hover:text-destructive rounded-lg h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Field content */}
          <div className="relative z-10 px-2 py-1">
            {renderField(field, isDragging)}
          </div>

          {/* Conditional indicator */}
          {field.conditional?.enabled && (
            <div className="mt-2 dark:bg-secondary/50 bg-secondary/30 rounded-lg p-2 text-xs text-muted-foreground flex items-center">
              <div className="dark:bg-primary/10 bg-primary/5 text-primary px-2 py-0.5 rounded-full font-medium mr-2">
                Conditional
              </div>
              <span>
                Shows when field "{field.conditional.dependsOn}"
                {field.conditional.value
                  ? ` equals "${field.conditional.value}"`
                  : " has any value"}
              </span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
