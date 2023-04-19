import * as React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Visual from "./index";

const server = setupServer(
  rest.get("/api/v1/metrics/stats", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Apr 30 22", value: 15.11806672141333 },
        { name: "Apr 26 22", value: 16.020777919711904 },
        { name: "Apr 27 22", value: 15.748477559999989 },
        { name: "Apr 29 22", value: 15.571481798251563 },
        { name: "May 05 22", value: 15.186027057687308 },
        { name: "May 04 22", value: 15.588334793937976 },
        { name: "May 06 22", value: 15.710643066748803 },
        { name: "May 01 22", value: 15.279028167051647 },
        { name: "May 02 22", value: 15.498193530791069 },
        { name: "May 03 22", value: 15.612445724964354 },
        { name: "Apr 28 22", value: 15.287043561204392 },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays greeting", async () => {
  render(<Visual type='day' />);
  await waitFor(() => {
    expect(screen.getByText('Apr 30 22')).toBeTruthy()
  })
  await waitFor(() => {
    expect(screen.getByText('May 02 22')).toBeTruthy()
  })
});
