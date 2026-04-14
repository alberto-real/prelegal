import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NdaForm from "@/components/NdaForm";
import { getDefaultFormData } from "@/lib/nda-types";

describe("NdaForm", () => {
  it("renders all section headings", () => {
    render(<NdaForm data={getDefaultFormData()} onChange={vi.fn()} />);

    expect(screen.getByText("Agreement Details")).toBeInTheDocument();
    expect(screen.getByText("MNDA Term")).toBeInTheDocument();
    expect(screen.getByText("Term of Confidentiality")).toBeInTheDocument();
    expect(screen.getByText("Governing Law & Jurisdiction")).toBeInTheDocument();
    expect(screen.getByText("MNDA Modifications")).toBeInTheDocument();
    expect(screen.getByText("Party 1")).toBeInTheDocument();
    expect(screen.getByText("Party 2")).toBeInTheDocument();
  });

  it("renders the purpose field with default value", () => {
    render(<NdaForm data={getDefaultFormData()} onChange={vi.fn()} />);

    const purposeFields = screen.getAllByRole("textbox", { name: /purpose/i });
    expect(purposeFields[0]).toHaveValue(
      "Evaluating whether to enter into a business relationship with the other party."
    );
  });

  it("renders the effective date field", () => {
    render(<NdaForm data={getDefaultFormData()} onChange={vi.fn()} />);
    expect(screen.getByText("Effective Date")).toBeInTheDocument();
  });

  it("calls onChange when purpose is updated", () => {
    const onChange = vi.fn();
    render(<NdaForm data={getDefaultFormData()} onChange={onChange} />);

    const purposeFields = screen.getAllByRole("textbox", { name: /purpose/i });
    fireEvent.change(purposeFields[0], {
      target: { value: "Testing new purpose" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ purpose: "Testing new purpose" })
    );
  });

  it("shows years input when fixed MNDA term is selected", () => {
    const data = { ...getDefaultFormData(), mndaTermType: "fixed" as const };
    render(<NdaForm data={data} onChange={vi.fn()} />);

    const yearLabels = screen.getAllByText("Years");
    expect(yearLabels.length).toBeGreaterThanOrEqual(1);
  });

  it("hides MNDA years input when untilTerminated is selected", () => {
    const data = {
      ...getDefaultFormData(),
      mndaTermType: "untilTerminated" as const,
      confidentialityTermType: "fixed" as const,
    };
    render(<NdaForm data={data} onChange={vi.fn()} />);

    // Only the confidentiality term "Years" input should be visible (not the MNDA one)
    const yearLabels = screen.getAllByText("Years");
    expect(yearLabels).toHaveLength(1);
  });

  it("calls onChange when governing law is updated", () => {
    const onChange = vi.fn();
    render(<NdaForm data={getDefaultFormData()} onChange={onChange} />);

    const govLawFields = screen.getAllByRole("textbox", {
      name: /governing law/i,
    });
    fireEvent.change(govLawFields[0], {
      target: { value: "California" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ governingLaw: "California" })
    );
  });

  it("renders party name fields for both parties", () => {
    render(<NdaForm data={getDefaultFormData()} onChange={vi.fn()} />);

    const nameFields = screen.getAllByRole("textbox", { name: /full name/i });
    expect(nameFields).toHaveLength(2);
  });
});
