import { MISSING_USERNAME, PW_MISSING } from '$lib/data/strings/ValidationMessages';
import { z } from 'zod';

export const loginUserSchema = z.object({
	username: z.string().trim().min(1, { message: MISSING_USERNAME }),
	password: z.string().trim().min(1, { message: PW_MISSING })
});
