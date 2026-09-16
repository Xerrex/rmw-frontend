import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parse } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats a "dd-MM-yyyy HH:mm" server date string into another date-fns format string.
export function formatDateTime(
  value: string,
  outputFormat: string = "dd-MM-yyyy HH:mm",
  inputFormat: string = "dd-MM-yyyy HH:mm"
) {
  /**
   * Format Date Time
   * outputFormat: string = "dd-MM-yyyy HH:mm"
   * inputFormat: string = "dd-MM-yyyy HH:mm"
   */
  return format(parse(value, inputFormat, new Date()), outputFormat)
}
