import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
    const form = screen.getByRole("form");
    const saveButton = screen.getByRole("button", { name: "Save" });

    fireEvent.change(nameInput, { target: { value: "Test Ship" } });
    fireEvent.change(lengthInput, { target: { value: 10 } });
    fireEvent.change(widthInput, { target: { value: 5 } });
    fireEvent.change(codeInput, { target: { value: "AAAA-1111-A1" } });

    expect(saveButton).toHaveAttribute("type", "submit");
    expect(form).toHaveFormValues({
      name: "Test Ship",
      lengthInMeters: 10,
      widthInMeters: 5,
      code: "AAAA-1111-A1",
    });
  });
  test("form name field validation", async () => {
    render(
      <MemoryRouter>
        <ShipForm />
      </MemoryRouter>
    );
    // form name field validation goes here
    const nameInput = screen.getByLabelText("Name");
    const lengthInput = screen.getByLabelText("Length in meters");
    const widthInput = screen.getByLabelText("Width in meters");
    const codeInput = screen.getByLabelText("Code");
    const saveButton = screen.getByRole("button", { name: "Save" });

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(lengthInput, { target: { value: -1 } });
    fireEvent.change(widthInput, { target: { value: -5 } });
    fireEvent.change(codeInput, { target: { value: "A1" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Length in meters must be a positive number")).toBeInTheDocument();
      expect(screen.getByText("Width in meters must be a positive number")).toBeInTheDocument();
      expect(screen.getByText("Code must be in the format of AAAA-1111-A1")).toBeInTheDocument();
    });

    fireEvent.change(nameInput, { target: { value: "Test Ship" } });
    fireEvent.change(lengthInput, { target: { value: 10 } });
    fireEvent.change(widthInput, { target: { value: 5 } });
    fireEvent.change(codeInput, { target: { value: "AAAA-1111-A1" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
      expect(screen.queryByText("Length in meters must be a positive number")).not.toBeInTheDocument();
      expect(screen.queryByText("Width in meters must be a positive number")).not.toBeInTheDocument();
      expect(screen.queryByText("Code must be in the format of AAAA-1111-A1")).not.toBeInTheDocument();
    });
  });
});
