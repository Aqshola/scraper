/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/index";

jest.mock("next/router", () => ({
  useRouter: () => ({ query: "" }),
}));

describe("Index", () => {
  it("Able to render index", () => {
    render(<Home />);
    const title = screen.getByText(/Cabar\.js!/i);
    expect(title).toBeInTheDocument();
  });
});
