import { describe, expect, it, vi } from "vitest";

import {
  sendCreated,
  sendResponse,
  sendSuccess,
} from "../../../src/utils/http/apiResponse";

describe("API Response Utilities", () => {
  const createResponse = () => {
    const json = vi.fn();

    const status = vi.fn(() => ({
      json,
    }));

    return {
      status,
      json,
    };
  };

  describe("sendResponse", () => {
    it("should send a custom response", () => {
      const res = createResponse();

      sendResponse(res as never, {
        success: true,
        message: "Success",
        data: {
          id: 1,
        },
        statusCode: 200,
      });

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Success",
        data: {
          id: 1,
        },
      });
    });
  });

  describe("sendSuccess", () => {
    it("should send a success response", () => {
      const res = createResponse();

      sendSuccess(res as never, "Done");

      expect(res.status).toHaveBeenCalled();
    });
  });

  describe("sendCreated", () => {
    it("should send a created response", () => {
      const res = createResponse();

      sendCreated(res as never, "Created");

      expect(res.status).toHaveBeenCalled();
    });
  });
});
