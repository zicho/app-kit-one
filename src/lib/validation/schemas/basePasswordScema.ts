import {
  MAX_CHARACTERS_F,
  MIN_CHARACTERS_F,
  PW_NO_SPACES
} from '$lib/data/strings/ValidationMessages';
import formatString from '$lib/utils/formatString';
import validationRules from '$lib/validation/config/ValidationRules';
import { z } from 'zod';

export const basePasswordSchema = z
  .string()
  .regex(/^[^\s]*$/, { message: PW_NO_SPACES })
  .min(validationRules.minPasswordLength, {
    message: formatString(
      MIN_CHARACTERS_F,
      validationRules.minPasswordLength
    )
  })
  .max(validationRules.maxPasswordLength, {
    message: formatString(
      MAX_CHARACTERS_F,
      validationRules.maxPasswordLength
    )
  })
  .trim();
