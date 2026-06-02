import { describe, test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import AccountContainer from "../../components/AccountContainer";

const mockData = [
  { id: 1, date: "2026-06-01", description: "Boba Tea", category: "Entertainment", amount: 7.50 },
  { id: 2, date: "2026-06-02", description: "Apartment Rent", category: "Housing", amount: 1200.00 },
];

describe("Display Transactions Suite", () => {
  test("fetches and displays transactions on component mount", async () => {
    // Utilize your setup.jsx global helper to mock fetch
    global.setFetchResponse(mockData);

    render(<AccountContainer />);

    // Wait until the items are loaded onto the screen
    await waitFor(() => {
      expect(screen.getByText("Boba Tea")).toBeInTheDocument();
      expect(screen.getByText("Apartment Rent")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:6001/transactions");
  });
});