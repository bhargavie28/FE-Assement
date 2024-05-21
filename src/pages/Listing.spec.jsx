import { render } from "@testing-library/react";
import ListingsPage from "./Listing";
import * as universityAPI from "../services/university";
import { vi } from "vitest";

describe("pages/Listing", () => {
  it("should get university list from API", () => {
    vi.spyOn(universityAPI, "get").mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
        },
      ])
    );
    render(<ListingsPage />);
  });

  it("should get university list from API", () => {
    vi.spyOn(universityAPI, "get").mockImplementation(() =>
      Promise.reject([
        {
          id: 1,
        },
      ])
    );
    render(<ListingsPage />);
  });
});
