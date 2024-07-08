// module imports
import { ApplicationError } from "./errorHandler.middleware.js";

/**
 * To handle incorrect request paths
 * @param {request} req
 * @param {response} res
 * @param {next middleware callback} next
 */
export const unknownPathHandlerMiddleware = (req, res, next) => {
  console.log("req url => ", req.url);
  console.log("req path => ", req.path);
  throw new ApplicationError(
    "404 request path not found, please check the request and method",
    404
  );
};
