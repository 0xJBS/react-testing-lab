import { describe, test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import AccountContainer from "../../components/AccountContainer";

const initialData = [
  { id: 1, date: "2026-06-01", description: "Boba Tea", category: "Entertainment", amount: 7.50 }
];

describe("Add Transactions Suite", () => {
  test("adds a transaction to the view and triggers backend POST call", async () => {
    const user = userEvent.setup();

    global.fetch = vi.fn().mockImplementation((url, options) => {
      if (options && options.method === "POST") {
        const parsedBody = JSON.parse(options.body);
        return Promise.resolve({
          json: () => Promise.resolve({ id: 2, ...parsedBody }),
          ok: true
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve(initialData),
        ok: true
      });
    });

    render(<AccountContainer />);
    
    await waitFor(() => expect(screen.getByText("Boba Tea")).toBeInTheDocument());

    const descriptionInput = screen.getByPlaceholderText("Description");
    const categoryInput = screen.getByPlaceholderText("Category");
    const amountInput = screen.getByPlaceholderText("Amount");
    const submitBtn = screen.getByRole("button", { name: /Add Transaction/i });

    // Using user-event behaves closer to real browser interactions,
    // which fixes form-property resolution issues in JSDOM environments.
    await user.type(descriptionInput, "Supermarket Groceries");
    await user.type(categoryInput, "Food");
    await user.type(amountInput, "45.20");
    
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Supermarket Groceries")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:6001/transactions",
      expect.objectContaining({ method: "POST" })
    );
  });
});