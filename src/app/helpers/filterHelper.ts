import { Query } from "mongoose";
import { TQueryObject } from "../interface/queryObject";

export const filter = <T>(model: Query<T[], T>, queryObj: TQueryObject) => {
  const excludedFields = [
    "page",
    "searchTerm",
    "limit",
    "sort",
    "sortBy",
    "sortOrder",
    "fields",
  ];
  excludedFields.forEach((keyword) => delete queryObj[keyword]);
  const modelQuery = model.find(queryObj);
  return modelQuery;
};
