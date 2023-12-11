import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorReponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorReponse => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "validation Error",
    errorSources,
  };
};

export default handleZodError;
