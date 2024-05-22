// src/yup.d.ts
import { StringSchema } from 'yup';

declare module 'yup' {
  interface StringSchema {
    checkIfConvertible(message: string): this;
  }
}