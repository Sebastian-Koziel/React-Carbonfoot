import { endPoints } from "../../../../endPoints/endPoints";
import { NewRaport } from "../../../../interfaces/interfaces";
import { storageGetToken } from "../../../../storage/localStorage";


export async function addNewRaportFetcher(data:NewRaport) {
    const token = storageGetToken();
    const response = await fetch(endPoints.addRaport, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });
  
  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with creating raport';
    throw new Error(errorMessage);
  }

  return response.json();
  
}