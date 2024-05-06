import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';

interface ValidationResponse {
  message: string;
  error?: boolean;
}

interface ErrorResponse {
  error: boolean;
  message: string;
}

export const tokenValidationLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs): Promise<ValidationResponse | ErrorResponse> => {
  const token = params.token as string; // Ensure token is treated as a string.
  try {
    const response = await fetch(`http://localhost:3000/auth/verify?token=${token}`);
    if (!response.ok) {
      throw new Error('Token validation failed');
    }
    const data: ValidationResponse = await response.json();
    return data;
  } catch (error) {
    return {
      error: true,
      message: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
}
