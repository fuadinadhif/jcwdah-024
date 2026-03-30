import { apiClient } from "@/api/client";
import { API_ENDPOINTS } from "@/api/endpoints";
import { useEffect } from "react";

export default function CustomerProfilePage() {
  useEffect(() => {
    async function getUserProfile() {
      const data = await apiClient.get(API_ENDPOINTS.CUSTOMER.PROFILE);
      console.log(data);
    }

    getUserProfile();
  }, []);

  return (
    <main>
      <h1>Customer Profile Page</h1>
    </main>
  );
}
