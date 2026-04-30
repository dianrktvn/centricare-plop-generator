import { useIntl } from "react-intl";
import { errorParser } from "../utils/errorParser";

/**
 * useErrorParser - Hook untuk menangani terjemahan error otomatis.
 * 
 * Hook ini akan mengekstrak error menggunakan errorParser dan menerjemahkannya
 * menggunakan react-intl sesuai bahasa yang sedang aktif dalam aplikasi.
 * 
 * @returns Object { parse: (error: unknown) => string }
 */
export function useErrorParser() {
  const intl = useIntl();

  /**
   * Mengambil pesan error yang sudah diterjemahkan.
   */
  const parse = (error: unknown): string => {
    const errorIdOrMessage = errorParser(error);

    // Cek apakah hasil parser adalah sebuah ID yang ada di I18N
    // Di intl, jika id tidak ditemukan, dia akan fallback ke id itu sendiri atau defaultMessage
    return intl.formatMessage({ 
      id: errorIdOrMessage, 
      defaultMessage: errorIdOrMessage // Fallback ke pesan aslinya jika ID tidak terdaftar
    });
  };

  return { parse };
}
