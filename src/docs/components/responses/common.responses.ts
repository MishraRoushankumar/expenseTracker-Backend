import { OpenAPIV3_1 } from "openapi-types";

export const commonResponses: Record<string, OpenAPIV3_1.ResponseObject> = {
  Unauthorized: {
    description: "Authentication required",
  },
  Forbidden: {
    description: "Insufficient permissions",
  },
  NotFound: {
    description: "Resource not found",
  },
  InternalServerError: {
    description: "Internal server error",
  },
};
