import { FORMS_CREATE } from "@/imports/api";
import { showToast } from "@/utils/toast";

const handleFormError = (data, setting) => {
  let error = false;
  data.forEach((element) => {
    if (!element.label?.trim()) {
      error = true;
      showToast.warn(
        `label is missing from ${element?.label} field at step : ${element.step}`
      );
    }
    if (element.type == FIELD_TYPES.DROPDOWN) {
      if (!element.options?.length) {
        error = true;

        showToast.warn(
          `options are missing from ${element.label} field at step : ${element.step}`
        );
      }
      if (element?.options?.some((v) => !v.label || !v.value)) {
        error = true;

        showToast.warn(
          `options are not valid for ${element.label} at step : ${element.step}`
        );
      }
    }
  });
  if (setting.status == "scheduled" && !setting.scheduledDate) {
    error = true;

    showToast.warn(`scheduled date is missing from form settings`);
  }
  if (!setting.title) {
    error = true;

    showToast.warn(`Form title is missing from form settings`);
  }
  return error;
};

const handleFormSubmission = async ({ data, setting, mutate }) => {
  // Format the date to maintain local time
  let scheduledTime = setting?.scheduledDate;
  if (scheduledTime) {
    const date = new Date(scheduledTime);
    // Format as YYYY-MM-DDTHH:mm
    scheduledTime = date.getFullYear() + '-' +
      String(date.getMonth() + 1).padStart(2, '0') + '-' +
      String(date.getDate()).padStart(2, '0') + 'T' +
      String(date.getHours()).padStart(2, '0') + ':' +
      String(date.getMinutes()).padStart(2, '0');
  }

  const body = {
    ...setting,
    status: setting.status.toUpperCase(),
    scheduledTime,
  };
  delete body.scheduledDate;
  delete body.uniqueUrl;

  const newData = data.map((element) => ({
    id: element.id,
    label: element.label,
    placeHolder: element.placeholder,
    type: element.type.toUpperCase(),
    options: element.options,
    step: element.step,
    required: element.required,
    conditionalFieldId: element.conditional?.dependsOn,
    conditionalFieldValue: element.conditional?.value,
  }));
  const response = await mutate({
    url: FORMS_CREATE,
    method: "POST",
    data: { ...body, fields: newData },
  });
  return response;
};

const modifyField = (formFields) => {
  const newFormFields = formFields.map((element) => {
    return {
      ...element,
      type: element.type.toLowerCase(),
      placeHolder: element.placeHolder,
      conditional: {
        dependsOn: element.conditionalFieldId,
        value: element.conditionalFieldValue,
      },

      options: element.options.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    };
  });
  return newFormFields;
};

const FIELD_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  NUMBER: "number",
  DROPDOWN: "dropdown",
  CHECKBOX: "checkbox",
  RATING: "rating",
};

export { handleFormError, FIELD_TYPES, handleFormSubmission, modifyField };
