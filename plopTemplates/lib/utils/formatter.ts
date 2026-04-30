import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/id";

/**
 * Formatter - Collection of formatting utilities for currency, dates, and name initials.
 *
 * @example
 * ```ts
 * Formatter.currency(50000)             // "Rp 50.000"
 * Formatter.currency(1234.5, "USD")     // "$1,234.50"
 * Formatter.date("2024-01-15")          // "15 Januari 2024"
 * Formatter.date("2024-01-15", "DD/MM/YYYY") // "15/01/2024"
 * Formatter.initial("John Doe")         // "JD"
 * Formatter.initial("Muhammad Dian R")  // "MDR"
 * ```
 */

interface IPatientNameType {
  prefix?: string;
  first?: string;
  middle?: string;
  last?: string;
  suffix?: string;
}

interface IUserNameType {
  salutation?: string;
  first?: string;
  middle?: string;
  last?: string;
  title?: string;
}

type NameType = IPatientNameType | IUserNameType | string;

export const Formatter = {
  /**
   * Format a number as currency.
   *
   * @param value    - Number or string to format
   * @param prefix   - Currency prefix. Default: "Rp"
   * @returns Formatted currency string
   */
  currency(
    value: number | string | null | undefined,
    prefix: string = "Rp",
  ): string {
    // Default to 0 if null or undefined
    const amount = value === null || value === undefined ? 0 : Number(value);

    try {
      // Use en-US formatting for comma-separator and dot-decimal
      const formatted = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);

      return prefix ? `${prefix} ${formatted}` : formatted;
    } catch {
      return prefix ? `${prefix} ${amount}` : String(amount);
    }
  },

  /**
   * Format a date string or Date object.
   *
   * @param value  - Date string, Date object, or dayjs-compatible value
   * @param format - dayjs format string. Default: "DD MMMM YYYY"
   * @returns Formatted date string
   */
  date(
    value: string | Date | Dayjs | null | undefined,
    format: string = "DD MMM YYYY",
  ): string {
    if (!value) return "-";

    const parsed = dayjs(value);
    if (!parsed.isValid()) return "-";

    // Locale removed as requested
    return parsed.format(format);
  },

  /**
   * Extract initials from a full name (string or object).
   * Follows the core name principle from fullName.ts (ignores prefix, suffix, salutation, title).
   *
   * @param name      - Full name string or object (IPatientNameType | IUserNameType)
   * @param maxLength - Maximum number of initials. Default: 3
   * @returns Uppercase initials
   */

  initial(
    name: NameType | null | undefined,
    maxLength: number = 3,
  ): string {
    if (!name) return "-";

    let nameToProcess = "";

    // Handle object input - extract only core name parts
    if (typeof name === "object" && name !== null) {
      const nameObj = name as IPatientNameType | IUserNameType;
      // Core parts: first, middle, last (ignores all prefixes, suffixes, titles, salutations)
      nameToProcess = [
        nameObj.first,
        "middle" in nameObj ? nameObj.middle : undefined,
        "last" in nameObj ? nameObj.last : undefined,
      ]
        .filter(Boolean)
        .join(" ");
    } else {
      // String input - use as-is
      nameToProcess = String(name).trim();
    }

    if (!nameToProcess) return "-";

    // Extract initials
    const initials = nameToProcess
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .slice(0, maxLength)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

    return initials || "-";
  },
};