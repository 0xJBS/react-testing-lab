import { describe, test, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import AccountContainer from "../../components/AccountContainer";

const mockData = [
  { id: 1, date: "2026-06-01", description: "Zeta Burger", category: "Food", amount: 15.00 },
  { id: 2, date: "2026-06-02", description: "Alpha Cinema", category: "Entertainment", amount: 22.00 },
];

describe("Search and Sort Suite", () => {
  test("filters row data dynamically on text input search change", async () => {
    global.setFetchResponse(mockData);
    render(<AccountContainer />);

    await waitFor(() => expect(screen.getByText("Zeta Burger")).toBeInTheDocument());

    const searchBox = screen.getByPlaceholderText("Search your Recent Transactions");

    // Filter to only match "Cinema"
    fireEvent.change(searchBox, { target: { value: "Cinema" } });

    expect(screen.getByText("Alpha Cinema")).toBeInTheDocument();
    expect(screen.queryByText("Zeta Burger")).not.toBeInTheDocument();
  });

  test("sorts the elements correctly based on dropdown selection", async () => {
    global.setFetchResponse(mockData);
    render(<AccountContainer />);

    await waitFor(() => expect(screen.getByText("Zeta Burger")).toBeInTheDocument());

    const sortSelect = screen.getByRole("combobox");

    // Change sort to "description" (Alpha Cinema should come before Zeta Burger)
    fireEvent.change(sortSelect, { target: { value: "description" } });

    const rows = screen.getAllByRole("row");
    // Row 0 is the table headers. Row 1 should be Alpha Cinema, Row 2 should be Zeta Burger
    expect(rows[1]).toHaveTextContent("Alpha Cinema");
    expect(rows[2]).toHaveTextContent("Zeta Burger");
  });
});