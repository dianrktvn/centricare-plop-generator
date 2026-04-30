import { AxiosError } from "axios";

/**
 * Kamus pemetaan pesan error dari backend ke Translation ID (intl keys).
 * Ini memungkinkan dukungan multi-bahasa (ID & EN).
 */
const ERROR_MAPPINGS: Record<string, string> = {
  // Modul Farmasi & Prescription
  "HIS setting not found": "errHisSettingNotFound",
  "Prescription not found": "errPrescriptionNotFound",
  "Stock tidak cukup": "errStockNotEnough",
  "Stock bahan tidak cukup": "errStockIngredientNotEnough",
  "Stock movement location not configured": "errStockMovementNotConfigured",
  "Service data invalid": "errServiceDataInvalid",
  "Registration data not found": "errRegistrationNotFound",
  "Active tariff not found": "errActiveTariffNotFound",
  "Tariff components not configured": "errTariffComponentsNotConfigured",
  "Tariff total invalid": "errTariffTotalInvalid",

  // Modul Pasien & Registrasi
  "NIK harus 16 digit angka": "errNikInvalidLength",
  "Patient not found": "errPatientNotFound",
  "Invalid registration_type": "errInvalidRegistrationType",
  "HisSetting not found": "errHisSettingNotFound",
  "Emergency patient data required": "errEmergencyDataRequired",
  "Appointment not found": "errAppointmentNotFound",
  "Registration not found": "errRegistrationNotFound",

  // Modul Transaksi & Billing
  "Transaction not found": "errTransactionNotFound",
  "Adjustment not found": "errAdjustmentNotFound",

  // Modul User & Autentikasi
  "Code is invalid or expired": "errCodeInvalidExpired",
  "Get User Failed": "errGetUserFailed",
  "Create Account Failed !": "errCreateAccountFailed",
  "user Already Registered": "errUserAlreadyRegistered",
  "Update Account Failed !": "errUpdateAccountFailed",
  "Invalid organization ID format": "errInvalidOrgIdFormat",
  "Organization not found": "errOrgNotFound",
  "Application settings not found": "errAppSettingsNotFound",
  "User already in organization": "errUserAlreadyInOrg",
  "User not found": "errUserNotFound",

  // Modul Lainnya (Vital Sign, Unit, Staff)
  "Encounter not found": "errEncounterNotFound",
  "Vital Sign not found": "errVitalSignNotFound",
  "Service Unit not found": "errServiceUnitNotFound",
  "Staff group not found": "errStaffGroupNotFound",
  "Queue information not found": "errQueueInfoNotFound",

  // General Validation
  "Required data is missing": "errRequiredDataMissing",

  // HTTP Status Errors
  "400 - Bad Request": "err400",
  "401 - Unauthorized": "err401",
  "403 - Forbidden": "err403",
  "404 - Not Found": "err404",
  "500 - Internal Server Error": "err500",
};

/**
 * Me-map pesan error asli ke Translation ID yang ada di I18N.
 */
function mapErrorToId(message: string): string {
  if (ERROR_MAPPINGS[message]) {
    return ERROR_MAPPINGS[message];
  }
  return message;
}

/**
 * errorParser - Mengekstrak pesan error atau Translation ID dari berbagai tipe data error.
 * Hasilnya bisa berupa Translation ID (misal: 'errStockNotEnough') atau string pesan mentah.
 */
export function errorParser(error: unknown): string {
  let rawMessage = "";

  if (error instanceof AxiosError || (error as any)?.isAxiosError) {
    const axiosErr = error as AxiosError<any>;
    const data = axiosErr.response?.data;

    if (data) {
      if (typeof data.message === "string") rawMessage = data.message;
      else if (typeof data.error === "string") rawMessage = data.error;
      else if (Array.isArray(data.errors)) rawMessage = data.errors.join(", ");
      else if (typeof data === "string") rawMessage = data;
    }

    if (!rawMessage) {
      if (axiosErr.code === "ERR_NETWORK") return "errNetwork";
      if (axiosErr.code === "ECONNABORTED") return "errTimeout";
      if (axiosErr.response?.statusText) {
        rawMessage = `${axiosErr.response.status} - ${axiosErr.response.statusText}`;
      }
    }

    rawMessage = rawMessage || axiosErr.message || "errUnknown";
  } else if (error instanceof Error) {
    rawMessage = error.message;
  } else if (typeof error === "string") {
    rawMessage = error;
  } else if (error && typeof error === "object" && "message" in error) {
    rawMessage = String((error as any).message);
  }

  return rawMessage ? mapErrorToId(rawMessage) : "errUnknown";
}
