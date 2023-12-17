import mongoose from "mongoose";
import { TErrorSource, TGenericErrorReponse } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorReponse => {
  const errorMessage: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      console.log(val);
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: "validation Error",
    errorMessage,
  };
};
export default handleValidationError;
