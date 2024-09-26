import type { z, ZodType } from "zod";
import { ZodError } from "zod";

export async function zParse<T extends ZodType>(
  schema: T,
  data: unknown,
): Promise<z.TypeOf<T>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw error.errors;
    }
    throw error;
  }
}
