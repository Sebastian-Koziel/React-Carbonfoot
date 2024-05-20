import { endPoints } from "../../../../endPoints/endPoints";
import { Raport } from "../../../../interfaces/interfaces";
import { storageGetToken } from "../../../../storage/localStorage";

interface FetchError {
  error: string;
}

export const fetchAllRaports = async (): Promise<Raport[] | FetchError> => {
   
    const token = storageGetToken();
    try{
    const response = await fetch(endPoints.getRaports, {
      headers: {
        Authorization: "Bearer "+token
      }
    });

    if(!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'Something went wrong with fetching raports';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;

  }catch(error){
    // Handle network and other errors
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
  
  };