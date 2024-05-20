import { endPoints } from "../../../../endPoints/endPoints";
import { storageGetToken } from "../../../../storage/localStorage";


export async function deleteRaport(raportId: string): Promise<void> {
  const token = storageGetToken();
  const response = await fetch(endPoints.deleteRaport +raportId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with deleting this raport';
    throw new Error(errorMessage);
  }
}