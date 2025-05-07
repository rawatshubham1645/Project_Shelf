import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { ChevronLeft } from 'lucide-react';
import { FieldRenderer } from '../createForm/components/FieldRenderer';
import { Progress } from '../../../ui/progress';
import { SortableField } from '../createForm/components/SortableField';

function PreivewForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  console.log(state,'qqqqqqqqqq')
  // Calculate total steps based on fields (5 fields per step)
  let totalSteps = 1

  state?.formFields?.forEach((field) => {
    if (field.step > totalSteps) {
      totalSteps = field.step;
    }
  });

   const renderField = (field, disabled) => (
      <FieldRenderer field={field} disabled={disabled} preview={true} />
    );
  if (!state?.formFields || state.formFields.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Form Data</h2>
          <p className="text-muted-foreground mb-4">This form has no fields yet.</p>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{state.formSettings?.title || 'Form Preview'}</h2>
          <div className="flex items-center space-x-2">
            <p className="text-muted-foreground">
              Preview how your form will appear to users
            </p>
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
              ${state.formSettings?.status === "OPEN" ? "bg-green-100 text-green-800" : ""}
              ${state.formSettings?.status === "CLOSED" ? "bg-red-100 text-red-800" : ""}
              ${state.formSettings?.status === "SCHEDULED" ? "bg-yellow-100 text-yellow-800" : ""}
              `}
            >
              {state.formSettings?.status || 'DRAFT'}
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white p-4 rounded-lg shadow-sm border mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% completed</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} />
        </div>
      </div>

      {/* Form fields */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border">
       
            {state.formFields
                            .filter((field) => field.step === currentStep)
                            .map((field) => (
                              <SortableField
                              preview={true}
                                key={field.id}
                                field={field}
                                // disabled={previewMode}
                                onEdit={() => setSelectedField(field)}
                                onDelete={() => deleteField(field.id)}
                                renderField={renderField}
                              />
                            ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center items-center mt-4 w-full">
        <div className='max-w-3xl flex justify-between items-center w-full'>

        <Button
          variant="outline"
          onClick={() => setCurrentStep(step => Math.max(1, step - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStep(step => Math.min(totalSteps, step + 1))}
          disabled={currentStep === totalSteps}
          >
          Next
        </Button>
            </div>
      </div>
    </div>
  );
}

export default PreivewForm;