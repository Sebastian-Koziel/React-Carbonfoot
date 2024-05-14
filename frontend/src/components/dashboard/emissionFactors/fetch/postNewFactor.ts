import { endPoints } from "../../../../endPoints/endPoints";
import { NewFactor } from "../../../../interfaces/interfaces";
import { storageGetToken } from "../../../../storage/localStorage";



export async function addNewFactor(data:NewFactor) {

    const token = storageGetToken();
    const response = await fetch(endPoints.addEmissionFactor, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with creating this factor';
    throw new Error(errorMessage);
  }

  return response.json();
}