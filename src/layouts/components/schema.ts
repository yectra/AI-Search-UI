import { z as zod } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { schemaHelper } from 'src/components/hook-form';

// -------------------------Join as a pro------------------------------------------

export const JoinProFormSchema = zod.object({
  nameAndDesignation: zod
    .string()
    .min(1, { message: 'Company name is required!' })
    .min(1, { message: 'Minimum 1 characters!' })
    .max(32, { message: 'Maximum 32 characters!' })
    .regex(/^[A-Za-z\s]+$/, { message: 'Company name can only accept letters' }),
  contactPhone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  contactEmail: zod.string().email({ message: 'Email is required!' }),
  termsAndConditions: schemaHelper.boolean({
    message: { required_error: 'Terms and Conditions is required!' },
  }),
});

// -------------------------Sign In---------------------------------------------

export const SignInFormSchema = zod.object({
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
});

export const SignInFormSchemaWithUserDetails = zod.object({
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  name: zod
    .string()
    .min(1, { message: 'Name is required!' })
    .min(4, { message: 'Minimum 4 characters!' })
    .max(32, { message: 'Maximum 32 characters!' })
    .regex(/^[A-Za-z\s]+$/, { message: 'Name can only accept letters' }),
  email: zod.string().email({ message: 'Email is required!' }),
});
