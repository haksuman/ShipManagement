import { render, screen, fireEvent } from "@testing-library/react";
import ShipForm from "../modules/ship-management/ShipForm";

describe("ShipForm", () => {
  test("renders form with input fields", () => {
    const onSubmit = jest.fn();
    render(<ShipForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Length in meters")).toBeInTheDocument();
    expect(screen.getByLabelText("Width in meters")).toBeInTheDocument();
    expect(screen.getByLabelText("Code")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  test("submits form data on save button click", () => {
    const onSubmit = jest.fn();
    render(<ShipForm onSubmit={onSubmit} />);

    const nameInput = screen.getByLabelText("Name");
    console.log(nameInput);
    const lengthInput = screen.getByLabelText("Length in meters");
    const widthInput = screen.getByLabelText("Width in meters");
    const codeInput = screen.getByLabelText("Code");
    const saveButton = screen.getByRole("button", { name: "Save" });

    fireEvent.change(nameInput, { target: { value: "Test Ship" } });
    fireEvent.change(lengthInput, { target: { value: 10 } });
    fireEvent.change(widthInput, { target: { value: 5 } });
    fireEvent.change(codeInput, { target: { value: "TS1" } });

    fireEvent.click(saveButton);

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Test Ship",
      lengthInMeters: 10,
      widthInMeters: 5,
      code: "TS1",
    });
  });

  test("does not submit form data on cancel button click", () => {
    const onSubmit = jest.fn();
    render(<ShipForm onSubmit={onSubmit} />);

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
