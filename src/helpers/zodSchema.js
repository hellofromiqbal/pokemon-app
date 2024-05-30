import { z } from 'zod';

export const collectionFormSchema = z.object({
  nickname: z.string({
    required_error: "Nickname is required.",
    invalid_type_error: "Nickname must be a string."
  }).min(2, { message: "Nickname must be at least 2 or more characters long."}).max(15, { message: "Nickname must be 15 or fewer characters long."}),
  description: z.string({
    required_error: "Description is required.",
    invalid_type_error: "Description must be a string."
  }).min(2, { message: "Description must be at least 2 or more characters long."}).max(20, { message: "Description must be 20 or fewer characters long."}),
});