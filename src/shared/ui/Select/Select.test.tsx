import { render, screen } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import type { ChangeEvent } from "react";
import type { SelectOption } from "@/shared/types/select";
import Select from "./Select";

describe("Select", () => {
  const TEST_OPTIONS: SelectOption<string | number>[] = [
    {
      label: "test_label_1",
      value: "test_value_1",
    },
    {
      label: "test_label_2",
      value: 2,
    },
  ];

  it("renders without breaking", () => {
    render(<Select options={TEST_OPTIONS} />);

    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
  });

  it("renders all passed options", () => {
    render(<Select options={TEST_OPTIONS} />);

    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(TEST_OPTIONS.length);
  });

  it("calls onChange event handler with option value on option click", async () => {
    const mockOnChange =
      vi.fn<(event: ChangeEvent<HTMLSelectElement>) => void>();
    render(<Select options={TEST_OPTIONS} onChange={mockOnChange} />);
    const user = userEvent.setup();

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, TEST_OPTIONS[1].label);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange.mock.calls[0][0].target.value).toEqual(
      String(TEST_OPTIONS[1].value),
    );
    expect(select).toHaveValue(String(TEST_OPTIONS[1].value));
  });
});
