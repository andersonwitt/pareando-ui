import { render, screen } from "@testing-library/react";
import { AppBar } from ".";

describe("AppBar Component Test", () => {
  it("Should be defined", () => {
    expect(AppBar).toBeDefined();
  });
  it("Should have Material Ui AppBar", () => {
    render(<AppBar />);
    expect(screen.getByTestId("app-bar")).toBeInTheDocument();
  });
  it("Should have Material Ui toolbar", () => {
    render(<AppBar />);
    expect(screen.getByTestId("nav-toolbar")).toBeInTheDocument();
  });
  it("Should have logo text", () => {
    render(<AppBar />);
    expect(screen.getByText("Pareando App")).toBeInTheDocument();
  });
});
