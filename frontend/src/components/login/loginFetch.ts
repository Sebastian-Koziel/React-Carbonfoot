import { endPoints } from "../../endPoints/endPoints";

export async function login(data:any) {

    const response = await fetch(endPoints.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });


  if(!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || 'Something went wrong with login you in';
    throw new Error(errorMessage);
  }

  return response.json();
}