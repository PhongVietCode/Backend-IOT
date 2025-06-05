/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError, ZodSchema, ZodTypeAny } from 'zod'
import { NextFunction, Request, Response } from 'express'
import { BadRequestError, InternalServerError } from '../errors/AppError'
async function parseSchema(schema: ZodSchema, data: any) {
  try {
    const result = await schema.parseAsync(data)
    return result
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err)
      throw new BadRequestError("Data is invalid")
    }
    throw new InternalServerError("Something went wrong with your data")
  }
}

type Schema = ZodTypeAny

interface ValidationSchema {
  body?: Schema
  query?: Schema
  params?: Schema
}

export function validateRequest(schema: ValidationSchema) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await parseSchema(schema.body, req.body)
      }
      if (schema.query) {
        req.query = await parseSchema(schema.query, req.query)
      }
      if (schema.params) {
        req.params = await parseSchema(schema.params, req.params)
      }
      next()
    } catch (error: any) {
      next(error)
    }
  }
}
