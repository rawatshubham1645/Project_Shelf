import useQuery from "@/hooks/useQuery";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  FORMS_ACCESS,
  FORMS_PUBLIC,
  FORMS_VALIDATE,
  RESPONSES_SUBMIT,
} from "@/imports/api";
import UtilLoading from "@/components/ui/utilLoading";
import { modifyField } from "@/components/home/form/createForm/form.config";
import { FieldRenderer } from "@/components/home/form/createForm/components/FieldRenderer";
import { SortableField } from "@/components/home/form/createForm/components/SortableField";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { showToast } from "@/utils/toast";
import useMutation from "@/hooks/useMutation";
import { AlertCircle, CalendarDays, Check, Clock, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return "";
  const date = new Date(dateTimeStr);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

function PublicForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formResponses, setFormResponses] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    trigger,
  } = useForm({
    mode: "onChange", // Enable real-time validation
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Function to check if a field should be shown based on conditions
  const shouldShowField = (field) => {
    if (!field?.conditional?.dependsOn) return true;

    const dependentValue = formResponses[field?.conditional?.dependsOn];

    if (!dependentValue) return false;

    // If no specific value is required, show if dependent field has any value
    if (!field?.conditional?.value) return true;

    // Check if the dependent field's value matches the required value
    return dependentValue === field?.conditional?.value;
  };

  const { id = null } = useParams();
  if (!id) {
    return <Navigate to="/" />;
  }
  const { data: formPass } = useQuery(`${FORMS_ACCESS}/${id}`);
  const { data, loading } = useQuery(
    `${FORMS_PUBLIC}/${id}`,
    !isPasswordVerified
  );
  const { mutate, loading: mutateLoading } = useMutation();
  const formFields = data?.data?.fields ? modifyField(data?.data?.fields) : [];

  useEffect(() => {
    if (formPass?.data?.password == "false") {
      setIsPasswordVerified(true);
    }
    return () => {};
  }, [formPass]);

  let totalSteps = 1;
  formFields?.forEach((field) => {
    if (field.step > totalSteps) {
      totalSteps = field.step;
    }
  });

  const getStatusStyles = () => {
    switch (data?.data?.status) {
      case "OPEN":
        return "bg-primary/10 text-primary border-primary/20";
      case "CLOSED":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "SCHEDULED":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted/50 text-muted-foreground border-muted/20";
    }
  };
  const StatusIcon = () => {
    switch (data?.data?.status) {
      case "OPEN":
        return <Check className="w-5 h-5 text-primary-foreground" />;
      case "CLOSED":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "SCHEDULED":
        return <Clock className="w-5 h-5 text-warning" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const onSubmit = async (formData) => {
    formData?.preventDefault();

    // Validate all required fields before submission
    const missingFields = formFields.filter(
      (field) =>
        shouldShowField(field) && field.required && !formResponses[field.id]
    );

    if (missingFields.length > 0) {
      showToast.error(
        `Please fill in all required fields: ${missingFields
          .map((f) => f.label)
          .join(", ")}`
      );
      return;
    }

    const body = {
      answersJson: formResponses,
      email: emailConsent ? userEmail : null,
    };

    const response = await mutate({
      url: `${RESPONSES_SUBMIT}/${data?.data?.id}`,
      method: "POST",
      data: body,
    });
    if (response.success) {
      setIsSubmissionSuccess(true);
    }
  };

  const verifyPassword = async () => {
    const response = await mutate({
      url: `${FORMS_VALIDATE}`,
      method: "POST",
      data: { uid: id, password },
    });

    if (response.success) {
      setIsPasswordVerified(true);
    }
  };

  if (loading) {
    return <UtilLoading />;
  }

  if (!isPasswordVerified && formPass?.data?.password == "true") {
    return (
      <div className="container mx-auto p-4 space-y-4 mt-10 bg-background">
        <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            This form is password protected
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button onClick={verifyPassword} className="w-full">
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (formPass?.data?.status == 404 || formPass?.data?.status == 400) {
    return (
      <div className="container mx-auto p-4 space-y-4 mt-10 bg-background">
        <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-sm border">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Form Closed
            </h2>
            <p className="text-muted-foreground">
              This form is no longer accepting responses. Please contact the
              form owner for more information.
            </p>
            {/* <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button> */}
          </div>
        </div>
      </div>
    );
  }

  if (formPass?.data?.status == 422) {
    return (
      <div className="container mx-auto p-4 space-y-4 mt-10 bg-background">
        <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-sm border">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8 text-warning" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Form Not Active Yet
            </h2>
            <p className="text-muted-foreground">
              This form is scheduled to open at:
            </p>
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border bg-muted/10">
              <CalendarDays className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">
                {formatDateTime(formPass?.data?.message)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Please come back at the scheduled time to submit your response.
            </p>
            {/* <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button> */}
          </div>
        </div>
      </div>
    );
  }

  if (isSubmissionSuccess) {
    return (
      <div className="container mx-auto p-4 space-y-4 mt-10 bg-background">
        <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-sm border">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Hooray! Form Submitted
            </h2>
            <p className="text-muted-foreground">
              Thank you for your response. Your submission has been recorded
              successfully.
            </p>
            {emailConsent && (
              <p className="text-sm text-muted-foreground">
                We'll keep you updated via email about any changes.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4 mt-10 bg-background">
      <div className="w-full bg-primary rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                Survey Collector
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                {data?.data?.title}
              </h2>
              {data?.data?.status !== "OPEN" && data?.data?.scheduledTime && (
                <div className="flex items-center space-x-2 text-primary-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <p className="text-sm">
                    {data?.data?.scheduledTime
                      ? formatDateTime(data?.data?.scheduledTime)
                      : ""}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 md:mt-0">
              {data?.data?.status != "OPEN" && (
                <div
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusStyles()}`}
                >
                  <StatusIcon />
                  <span className="font-medium">{data?.data?.status}</span>
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 text-white max-w-2xl">
            Please fill out the form below. All fields marked with an asterisk
            (*) are required.
          </p>
        </div>

        <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-card text-card-foreground p-4 rounded-lg shadow-sm border mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>
              {Math.round((currentStep / totalSteps) * 100)}% completed
            </span>
          </div>
          <Progress value={Math.round((currentStep / totalSteps) * 100)} />
        </div>
      </div>

      {/* Form fields */}
      <form
        onSubmit={onSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border"
      >
        {formFields
          .filter((field) => field.step === currentStep)
          .map((field) =>
            shouldShowField(field) ? (
              <div key={field.id} className="mb-4">
                <SortableField
                  preview={true}
                  field={field}
                  renderField={(field) => (
                    <div>
                      <FieldRenderer
                        field={field}
                        disabled={false}
                        preview={true}
                        register={register}
                        setValue={setValue}
                        value={formResponses[field.id]}
                        onChange={async (value) => {
                          // Handle rating field value
                          const fieldValue =
                            field.type === "rating" ? Number(value) : value;
                          setFormResponses((prev) => ({
                            ...prev,
                            [field.id]: fieldValue,
                          }));

                          // Trigger validation for email fields
                          if (field.type === "email" && fieldValue) {
                            await trigger(field.id);
                          }

                          // Clear validation errors
                          if (fieldValue || fieldValue === 0) {
                            if (field.type !== "email") {
                              clearErrors(field.id);
                            }
                            setValidationErrors((prev) => ({
                              ...prev,
                              [field.id]: false,
                            }));
                          }
                        }}
                        required={field.required}
                      />
                      {(errors[field.id] || validationErrors[field.id]) && (
                        <p className="text-red-500 text-sm mt-1">
                          {field.type === "email" &&
                          errors[field.id]?.type === "pattern"
                            ? "Please enter a valid email address"
                            : !formResponses[field.id] && field.required
                            ? `${field.label} is required`
                            : errors[field.id]?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            ) : null
          )}

        {/* Navigation and submit buttons */}
        <div className="space-y-6">
          {currentStep === totalSteps && (
            <div className="p-4 w-full border rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-4">Stay Connected</h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="userEmail"
                    className="block text-sm font-medium mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full p-2 border rounded bg-background text-foreground border-input"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="emailConsent"
                    checked={emailConsent}
                    onChange={(e) => setEmailConsent(e.target.checked)}
                    className="rounded border-input"
                  />
                  <label
                    htmlFor="emailConsent"
                    className="text-sm text-muted-foreground"
                  >
                    I agree to share my email for future updates
                  </label>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep((step) => Math.max(1, step - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            {currentStep === totalSteps ? (
              <Button
                loading={mutateLoading}
                type="submit"
                onClick={(e) => {
                  const missingFields = formFields.filter(
                    (field) =>
                      shouldShowField(field) &&
                      field.required &&
                      !formResponses[field.id]
                  );

                  if (missingFields.length > 0) {
                    e.preventDefault();
                    showToast.error(
                      `Please fill in required fields: ${missingFields
                        .map((f) => f.label)
                        .join(", ")}`
                    );
                    return;
                  }

                  // Validate email if consent is checked
                  if (emailConsent && !userEmail) {
                    e.preventDefault();
                    showToast.error("Please enter your email address");
                    return;
                  }

                  if (emailConsent && !/^\S+@\S+\.\S+$/.test(userEmail)) {
                    e.preventDefault();
                    showToast.error("Please enter a valid email address");
                    return;
                  }
                }}
              >
                Submit Form
              </Button>
            ) : (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const currentFields = formFields.filter(
                    (field) => field.step === currentStep
                  );
                  const missingFields = currentFields.filter(
                    (field) =>
                      shouldShowField(field) &&
                      field.required &&
                      !formResponses[field.id]
                  );
                  const validEmailFields = currentFields.filter(
                    (field) =>
                      field.type === "email" &&
                      formResponses[field.id] &&
                      !/^\S+@\S+\.\S+$/.test(formResponses[field.id])
                  );
                  if (validEmailFields.length > 0) {
                    showToast.error(
                      `Please enter a valid email address for : ${validEmailFields
                        .map((f) => f.label)
                        .join(", ")}`
                    );
                    return;
                  }

                  if (missingFields.length > 0) {
                    showToast.error(
                      `Please fill in required fields: ${missingFields
                        .map((f) => f.label)
                        .join(", ")}`
                    );
                    return;
                  }
                  // Clear validation errors for current step
                  const newErrors = { ...validationErrors };
                  currentFields.forEach((field) => {
                    delete newErrors[field.id];
                  });
                  setValidationErrors(newErrors);
                  setCurrentStep((step) => Math.min(totalSteps, step + 1));
                }}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PublicForm;
