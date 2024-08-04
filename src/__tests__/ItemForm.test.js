import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemForm from "../components/ItemForm";

test("calls the onItemFormSubmit callback prop when the form is submitted", () => {
  const onItemFormSubmit = jest.fn();
  render(<ItemForm onItemFormSubmit={onItemFormSubmit} />);

  fireEvent.change(screen.getByLabelText(/Name:/), {
    target: { value: "Ice Cream" },
  });

  fireEvent.change(screen.getByLabelText(/Category:/), {
    target: { value: "Dessert" },
  });

  fireEvent.submit(screen.getByText(/Add to List/));

  expect(onItemFormSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      id: expect.any(String),
      name: "Ice Cream",
      category: "Dessert",
    })
  );
});

test("adds a new item to the list when the form is submitted", () => {
  render(<App />);

  const initialDessertCount = screen.queryAllByText(/Dessert/).length;

  fireEvent.change(screen.getByLabelText(/Name:/), {
    target: { value: "Ice Cream" },
  });

  fireEvent.change(screen.getByLabelText(/Category:/), {
    target: { value: "Dessert" },
  });

  fireEvent.submit(screen.getByText(/Add to List/));

  expect(screen.getByText(/Ice Cream/)).toBeInTheDocument();
  expect(screen.queryAllByText(/Dessert/).length).toBe(initialDessertCount + 1);
});
