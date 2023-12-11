export type TErrorSource = {
  path: string | number;
  message: string;
}[];
export type TGenericErrorReponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};
