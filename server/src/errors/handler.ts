import { ErrorRequestHandler } from 'express';
import multer from 'multer';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: 'Validation fails', errors });
  }

  if (error instanceof multer.MulterError) {
    return response.status(400).json({ message: 'Error on upload.' });
  }

  console.error(error);

  return response.status(500).json({ message: 'Internal Server Error.' });
};

export default errorHandler;
