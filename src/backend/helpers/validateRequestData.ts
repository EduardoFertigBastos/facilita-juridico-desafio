import { z } from "zod";

export function validateRequestData(data: any, schema: z.ZodObject<any>) {
  try {
    schema.parse(data)
  } catch (error: any) {
    console.log(error)
    throw new Error(error.errors[0].message);
  }
  
}