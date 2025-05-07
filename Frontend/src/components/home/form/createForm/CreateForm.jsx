import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "../../../ui/button";
import { Progress } from "../../../ui/progress";
import { ChevronLeft, Eye, Plus, Save } from "lucide-react";
import { FormSettings } from "./components/FormSettings";
import { SortableField } from "./components/SortableField";
import { FieldEditor } from "./components/FieldEditor";
import { FieldRenderer } from "./components/FieldRenderer";
import {
  handleFormError,
  FIELD_TYPES,
  handleFormSubmission,
} from "./form.config";
import useMutation from "@/hooks/useMutation";
import { useNavigate } from "react-router-dom";

function CreateForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [formSettings, setFormSettings] = useState({
    status: "open",
    scheduledDate: null,
    uniqueUrl: "",
    password: "",
    webhookUrl: "",
    title: "",
  });
  const [formFields, setFormFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const navigate = useNavigate();
  const { mutate, loading } = useMutation();

  const addField = (type) => {
    const newField = {
      id: `field-${Date.now()}`,
      type,
      label: "",
      placeholder: `Enter ${type} value`,
      required: false,
      step: currentStep,
      options:
        type === FIELD_TYPES.DROPDOWN
          ? [
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
            ]
          : [],
      conditional: {
        enabled: false,
        dependsOn: "",
        value: "",
      },
    };
    setFormFields([...formFields, newField]);
    setSelectedField(newField);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFormFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateField = (id, updates) => {
    console.log("Updating field:", {
      fieldId: id,
      updates: JSON.stringify(updates, null, 2),
    });

    setFormFields((prevFields) => {
      const newFields = prevFields.map((field) => {
        if (field.id === id) {
          let updatedField;

          // Handle nested updates for conditional logic
          if (updates.conditional) {
            updatedField = {
              ...field,
              conditional: {
                enabled: false,
                dependsOn: "",
                value: "",
                ...field.conditional,
                ...updates.conditional,
              },
            };
          } else {
            updatedField = { ...field, ...updates };
          }

          console.log("Updated field:", updatedField);

          // Update selected field if this is the one being edited
          if (selectedField && selectedField.id === id) {
            setSelectedField(updatedField);
          }

          return updatedField;
        }
        return field;
      });

      return newFields;
    });
  };

  const deleteField = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const renderFieldEditor = (field) => (
    <div className="space-y-4">
      <FieldEditor
        field={field}
        formFields={formFields.filter((f) => f.step === currentStep)}
        onUpdate={updateField}
      />
    </div>
  );

  const handleFormSettingsUpdate = (updates) => {
    setFormSettings((prev) => ({ ...prev, ...updates }));
  };

  const renderField = (field, disabled) => (
    <FieldRenderer field={field} disabled={disabled} />
  );
  const handleSubmit = async () => {
    const isValid = handleFormError(formFields, formSettings);

    if (!isValid) {
      const response = await handleFormSubmission({
        data: formFields,
        setting: formSettings,
        mutate,
      });
      if (response.success) {
        navigate(-1);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Create Form</h2>
          <p className="text-muted-foreground">
            Design your form with drag and drop
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button
            variant="ghost"
disabled={formFields.length === 0}
            onClick={() =>{
                    
                    setPreviewMode(!previewMode)}}
                
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button
            loading={loading}
            disabled={formFields.length === 0 ||previewMode}
            onClick={handleSubmit}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Form
          </Button>
        </div>
      </div>

      <Progress value={(currentStep / totalSteps) * 100} />
      <div className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {!previewMode&& Object.values(FIELD_TYPES).map((type) => (
              <Button
                key={type}
                variant="outline"
                size="custom"
                className="py-2 px-3"
                onClick={() => addField(type)}
                disabled={previewMode}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add {type}
              </Button>
            ))}
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="space-y-4">
              <SortableContext
                items={formFields
                  .filter((field) => field.step === currentStep)
                  .map((field) => field.id)}
                strategy={verticalListSortingStrategy}
              >
                {formFields
                  .filter((field) => field.step === currentStep)
                  .map((field) => (
                    <SortableField
                      key={field.id}
                      field={field}
                      disabled={previewMode}
                      onEdit={() => setSelectedField(field)}
                      onDelete={() => deleteField(field.id)}
                      renderField={renderField}
                    />
                  ))}
              </SortableContext>
            </div>
          </DndContext>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((step) => Math.max(1, step - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              disabled={currentStep === totalSteps && previewMode}
              onClick={() => {
                if (currentStep === totalSteps && !previewMode) {
                  setTotalSteps((steps) => steps + 1);
                }
                setCurrentStep((step) => step + 1);
              }}
            >
              {currentStep === totalSteps && !previewMode ? "Add Step" : "Next"}
            </Button>
          </div>
        </div>

       {!previewMode && <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-8">
            {formFields?.find((field) => field.id === selectedField?.id) &&
              !previewMode && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Field Settings</h3>
                  {renderFieldEditor(selectedField)}
                </div>
              )}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Form Settings</h3>
              <FormSettings
                settings={formSettings}
                onUpdate={handleFormSettingsUpdate}
              />
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default CreateForm;
