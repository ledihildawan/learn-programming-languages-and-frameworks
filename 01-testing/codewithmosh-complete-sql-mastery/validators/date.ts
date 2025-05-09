import { z } from "zod";

export function zDate(config?: {
  min?: Date;
  max?: Date;
  required?: boolean;
  fieldName?: string;
  messages?: {
    required?: string;
    invalid?: string;
    tooEarly?: string;
    tooLate?: string;
  };
}) {
  const defaults = {
    min: new Date(1900, 0, 1),
    max: new Date(),
    required: false,
    fieldName: "Date",
    messages: {
      required: "is required",
      invalid: "is invalid",
      tooEarly: "is too early",
      tooLate: "is too late",
    },
  };

  const { min, max, required, fieldName, messages } = {
    ...defaults,
    ...config,
    messages: { ...defaults.messages, ...config?.messages },
  };

  const optionalSchema = z.optional(
    z
      .date()
      .min(min, { message: `${fieldName} ${messages.tooEarly} (min ${min.toLocaleDateString()})` })
      .max(max, { message: `${fieldName} ${messages.tooLate} (max ${max.toLocaleDateString()})` }),
  );
  const requiredSchema = z.date({
    required_error: `${fieldName} ${messages.required}`,
    invalid_type_error: `${fieldName} ${messages.invalid}`,
  });

  const params = required ? requiredSchema : optionalSchema;

  return z.preprocess((value) => {
    if (!value) {
      return undefined;
    }

    try {
      const date = new Date(value as string);

      return isNaN(date.getTime()) ? undefined : date;
    } catch {
      return undefined;
    }
  }, params);
}

export function formatZodDateError(error: z.ZodError) {
  return error.issues.map((issue) => ({
    code: issue.code === "too_small" ? "too_early" : issue.code === "too_big" ? "too_late" : issue.code,
    message: issue.message,
    path: issue.path,
    ...(issue.code === "too_small" && { min: (issue as z.ZodTooSmallIssue).minimum }),
    ...(issue.code === "too_big" && { max: (issue as z.ZodTooBigIssue).maximum }),
  }));
}
