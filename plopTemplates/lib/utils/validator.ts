interface ValidationResult {
  valid: boolean;
  message?: string;
}

/**
 * validator - Kumpulan utility validasi untuk data kesehatan.
 */
export const validator = {
  /**
   * Validasi NIK (Nomor Induk Kependudukan) Khusus.
   * Digunakan untuk form pendaftaran User atau jika form Pasien mewajibkan NIK.
   * Wajib 16 digit angka.
   */
  nik(value: string | null | undefined): ValidationResult {
    if (!value || !value.trim()) {
      return { valid: false, message: "NIK tidak boleh kosong" };
    }

    const cleaned = value.replace(/\s/g, "");

    if (!/^\d+$/.test(cleaned)) {
      return { valid: false, message: "NIK hanya boleh berisi angka" };
    }

    if (cleaned.length !== 16) {
      return { valid: false, message: "NIK harus 16 digit angka" };
    }

    return { valid: true };
  },

  /**
   * Validasi Nomor Identitas Umum (SSN / NIK / Paspor).
   * Digunakan untuk pendaftaran pasien yang bisa menggunakan NIK atau Paspor.
   * Mendukung Alphanumeric (Huruf & Angka) dengan panjang 5-20 karakter.
   */
  ssn(value: string | null | undefined): ValidationResult {
    if (!value || !value.trim()) {
      return { valid: false, message: "Nomor identitas tidak boleh kosong" };
    }

    const cleaned = value.trim();

    // Mengizinkan huruf dan angka (untuk mengakomodasi nomor Paspor)
    if (!/^[a-zA-Z0-9]+$/.test(cleaned)) {
      return {
        valid: false,
        message: "Nomor identitas hanya boleh berisi huruf dan angka",
      };
    }

    if (cleaned.length < 7 || cleaned.length > 16) {
      return {
        valid: false,
        message: "Nomor identitas harus antara 7 hingga 16 karakter",
      };
    }

    return { valid: true };
  },

  /**
   * Validasi nomor telepon (Format Indonesia).
   * Mendukung: +62xxx, 08xxx, 021xxx
   */
  phone(value: string | null | undefined): ValidationResult {
    if (!value || !value.trim()) {
      return { valid: false, message: "Nomor telepon tidak boleh kosong" };
    }

    const cleaned = value.replace(/[\s\-().]/g, "");

    if (/^\+62\d{8,13}$/.test(cleaned)) {
      return { valid: true };
    }

    if (/^0\d{8,13}$/.test(cleaned)) {
      return { valid: true };
    }

    if (/^\d{8,15}$/.test(cleaned)) {
      return { valid: true };
    }

    return { valid: false, message: "Format nomor telepon tidak valid" };
  },

  /**
   * Validasi nomor Rekam Medis (MRN).
   * Mengizinkan alphanumeric, tanda hubung (-), dan titik (.).
   */
  mrn(value: string | null | undefined): ValidationResult {
    if (!value || !value.trim()) {
      return { valid: false, message: "MRN tidak boleh kosong" };
    }

    const cleaned = value.trim();

    if (!/^[a-zA-Z0-9.\-]+$/.test(cleaned)) {
      return {
        valid: false,
        message: "MRN hanya boleh berisi huruf, angka, strip (-), dan titik (.)",
      };
    }

    return { valid: true };
  },
};

export type { ValidationResult };
