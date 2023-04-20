import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShipForm from "../modules/ship-management/ShipForm";
import { MemoryRouter } from "react-router-dom";

describe("ShipForm", () => {
  test("renders form with input fields", () => {
    render(
      <MemoryRouter>
        <ShipForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Length in meters")).toBeInTheDocument();
    expect(screen.getByLabelText("Width in meters")).toBeInTheDocument();
    expect(screen.getByLabelText("Code")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  test("form fields get value changes", () => {
    render(
      <MemoryRouter>
        <ShipForm />
      </MemoryRouter>
    );
    const nameInput = screen.getByLabelText("Name");
    const lengthInput = screen.getByLabelText("Length in meters");
    const widthInput = screen.getByLabelText("Width in meters");
    const codeInput = screen.getByLabelText("Code");
    const saveButton = screen.getByRole("button", { name: "Save" });
    // get form element
    const form = screen.getByRole("form");

    fireEvent.change(nameInput, { target: { value: "Test Ship" } });
    fireEvent.change(lengthInput, { target: { value: 10 } });
    fireEvent.change(widthInput, { target: { value: 5 } });
    fireEvent.change(codeInput, { target: { value: "TS1" } });

    fireEvent.click(saveButton);

    expect(saveButton).toHaveAttribute("type", "submit");
    expect(form).toHaveFormValues({
      name: "Test Ship",
      lengthInMeters: 10,
      widthInMeters: 5,
      code: "TS1",
    });
  });

  test("form name field validation", () => {
    render(
      <MemoryRouter>
        <ShipForm />
      </MemoryRouter>
    );
    const nameInput = screen.getByLabelText("Name");
    const codeInput = screen.getByLabelText("Code");
    const saveButton = screen.getByRole("button", { name: "Save" });

    fireEvent.click(saveButton);

    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(codeInput).toHaveAttribute("aria-invalid", "true");

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Code is required")).toBeInTheDocument();
  });
});
