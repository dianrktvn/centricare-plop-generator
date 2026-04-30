import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { facilityState } from "../../features/faskes/states/facility.global.state";

/**
 * useTenantId - Easily extract tenant id and full facility data from URL params, Global State, and localStorage.
 *
 * Supports three sources (in order of priority):
 * 1. URL route param `:tenantId` (via react-router-dom useParams)
 * 2. Global State `facilityState` (Recoil)
 * 3. localStorage "faskes" (fallback/persistence)
 */
export const useTenantId = () => {
  const { tenantId: urlTenant } = useParams<{ tenantId: string }>();

  // Ambil data lengkap dari Global State (Recoil)
  const facilityGlobalState = useRecoilValue(facilityState);
  const globalTenantId = facilityGlobalState?._id;

  let storedTenantId: string | null = null;
  try {
    const raw = localStorage.getItem("faskes");
    storedTenantId = raw ? JSON.parse(raw) : null;
  } catch {
    storedTenantId = null;
  }

  // Prioritas pengambilan ID
  const tenantId = (urlTenant || globalTenantId || storedTenantId || "").toString();

  return {
    tenantId,
    isValid: !!tenantId,
    // Sekarang kita juga mengembalikan data lengkap faskes jika tersedia di global state
    facility: facilityGlobalState,
    source: urlTenant ? "url" : globalTenantId ? "global_state" : storedTenantId ? "local_storage" : "none"
  };
};