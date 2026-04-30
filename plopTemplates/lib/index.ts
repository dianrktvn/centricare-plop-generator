// ============================================================
// Cloud HIS - Internal Toolkit
// ============================================================
// A collection of internal tools written for ReactJS to minimize
// boilerplate and increase developer productivity.
// ============================================================

// --- API Factory ---
export { createQuery, createMutation, createListQuery } from "./api";

// --- Hooks ---
export { useUrlFilter } from "./hooks";
export { useTenantId } from "./hooks";
export { useServerSentEvent } from "./hooks";

// --- Utils ---
export { Formatter } from "./utils";
export { errorParser } from "./utils";
export { cleanPayload } from "./utils";
export { validator } from "./utils";
export type { ValidationResult } from "./utils";
export { buildQueryParams } from "./utils";
export type { IListParams, IQueryParams } from "./utils";

// --- Types ---
export type { IPaginationMetadataType } from "./types/pagination";
