import * as yup from "yup";

// Common field validations
export const emailSchema = yup
  .string()
  .email("Please enter a valid email")
  .required("Email is required");

export const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .required("Password is required")
  .matches(
    /^(?=.*[a-z])(?=.*\d)/,
    "Password must contain at least one lowercase letter and one number."
  );

export const nameSchema = yup
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be less than 50 characters")
  .required("Name is required");

export const phoneSchema = yup
  .string()
  .matches(/^[0-9]+$/, "Phone number must only contain digits")
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number must be less than 15 digits");

// Form Schemas
export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = yup.object().shape({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  phone: phoneSchema.optional(),
});

export const forgotPasswordSchema = yup.object().shape({
  email: emailSchema,
});

export const resetPasswordSchema = yup.object().shape({
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
