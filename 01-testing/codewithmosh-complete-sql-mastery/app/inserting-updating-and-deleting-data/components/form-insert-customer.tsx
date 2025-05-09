"use client";

import { DateTimePicker } from "@/components/datetime-picker";
import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppForm } from "@/hooks/use-form";
import { Customer } from "@/types";
import { formatZodDateError, zDate } from "@/validators/date";
import { FormEvent, useCallback } from "react";
import { z } from "zod";

type CustomerForm = Omit<Customer, "birthDate"> & { birthDate?: Date };

const minBirthDate = new Date(1930, 0, 1);
const maxBirthDate = new Date();

const validationRules = {
  city: z.string().min(1, "City is required"),
  phone: z.string().min(1, "Phone is required"),
  state: z.string().min(1, "State is required"),
  address: z.string().min(1, "Address is required"),
  lastName: z.string().min(1, "Last Name is required"),
  birthDate: zDate({
    min: minBirthDate,
    max: maxBirthDate,
    required: false,
    messages: {
      tooLate: `must be before ${maxBirthDate.toLocaleDateString()}`,
      tooEarly: `must be after ${minBirthDate.toLocaleDateString()}`,
    },
    fieldName: "Birth Date",
  }),
  firstName: z.string().min(1, "First Name is required"),
};

export default function FormInsertCustomer() {
  const form = useAppForm({
    defaultValues: {
      city: "",
      phone: "",
      state: "",
      address: "",
      lastName: "",
      firstName: "",
    } as CustomerForm,
    onSubmit: (props) => {
      console.log(props);
    },
    validators: {
      onSubmit: ({ value }) => z.object(validationRules).safeParse(value),
    },
  });

  const handleSubmit = useCallback(
    <T,>(e: FormEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();

      form.handleSubmit();
    },
    [form],
  );

  return (
    <form className="grid space-y-6" onSubmit={handleSubmit}>
      <form.AppField
        name="firstName"
        validators={{
          onChange: validationRules.firstName,
        }}
      >
        {(field) => (
          <field.FormItem>
            <field.FormLabel>
              First Name <span className="text-sm leading-none font-medium text-red-500">*</span>
            </field.FormLabel>
            <field.FormControl>
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="First Name"
              />
            </field.FormControl>
            <field.FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppField
        name="lastName"
        validators={{
          onChange: validationRules.lastName,
        }}
      >
        {(field) => (
          <field.FormItem>
            <field.FormLabel>Last Name</field.FormLabel>
            <field.FormControl>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Last Name"
              />
            </field.FormControl>
            <field.FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppField
        name="city"
        validators={{
          onChange: validationRules.city,
        }}
      >
        {(field) => (
          <field.FormItem>
            <field.FormLabel>City</field.FormLabel>
            <field.FormControl>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="City"
              />
            </field.FormControl>
            <field.FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppField
        name="state"
        validators={{
          onChange: validationRules.state,
        }}
      >
        {(field) => (
          <field.FormItem>
            <field.FormLabel>State</field.FormLabel>
            <field.FormControl>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="State"
              />
            </field.FormControl>
            <field.FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppField
        name="address"
        validators={{
          onChange: validationRules.address,
        }}
      >
        {(field) => (
          <field.FormItem>
            <field.FormLabel>Address</field.FormLabel>
            <field.FormControl>
              <Textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Address"
              />
            </field.FormControl>
            <field.FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppField
        name="phone"
        validators={{
          onChange: validationRules.phone,
        }}
      >
        {(field) => (
          <field.FormItem>
            <field.FormLabel>Phone</field.FormLabel>
            <field.FormControl>
              <PhoneInput value={field.state.value!} onChange={(value) => field.handleChange(value)}></PhoneInput>
            </field.FormControl>
            <field.FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppField
        name="birthDate"
        validators={{
          onChange: ({ value }) => {
            const { error, success } = validationRules.birthDate.safeParse(value);

            if (!success) {
              return formatZodDateError(error);
            }

            return undefined;
          },
        }}
      >
        {(field) => (
          <field.FormItem>
            <field.FormLabel>Birth Date</field.FormLabel>
            <field.FormControl>
              <DateTimePicker
                min={minBirthDate}
                max={maxBirthDate}
                value={field.state.value}
                hideTime={true}
                onChange={(value) => field.handleChange(value)}
              ></DateTimePicker>
            </field.FormControl>
            <field.FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppForm>
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} isPending={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </form.Subscribe>
      </form.AppForm>
    </form>
  );
}
