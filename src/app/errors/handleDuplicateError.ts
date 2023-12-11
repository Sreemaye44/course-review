import { TErrorSource, TGenericErrorReponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorReponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSource = [
    {
      path: " ",
      message: `${extractedMessage}  is already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid id",
    errorSources,
  };
};

export default handleDuplicateError;
