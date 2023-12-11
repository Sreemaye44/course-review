import mongoose from "mongoose";
import { TErrorSource, TGenericErrorReponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorReponse => {
  const errorSources: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid Id",
    errorSources,
  };
};
export default handleCastError;
