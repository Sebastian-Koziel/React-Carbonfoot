import { Factor, Raport } from "../../../../interfaces/interfaces";
import { fetchFactors } from "../../emissionFactors/fetch/fetchFactors";
import { fetchRaportById } from "./fetchRaportById";


export interface FetchError {
    error: string;
  }

export interface raportDetailsConsolidatedData {
    factors: Factor[] | FetchError;
    raport: Raport | FetchError;
    
  }
  
  export const raportDetailsLoader = async ({params}: {params: any}): Promise<raportDetailsConsolidatedData | FetchError> => {
    const _id = params.raportId;

    try {
      const factorsPromise = fetchFactors();
      const raportPromise = fetchRaportById(_id);
      
  
      const [factors, raport] = await Promise.all([factorsPromise, raportPromise]);
      
      // Consolidate the data
      const consolidatedData: raportDetailsConsolidatedData = {
        factors,
        raport
      };
  
      return consolidatedData;
    } catch (error) {
      // Handle network and other errors
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "An unexpected error occurred" };
    }
  };