import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NdaPreview from "@/components/NdaPreview";
import { getDefaultFormData } from "@/lib/nda-types";

describe("NdaPreview", () => {
  it("renders the document title", () => {
    render(<NdaPreview data={getDefaultFormData()} />);
    expect(
      screen.getByText("Mutual Non-Disclosure Agreement")
    ).toBeInTheDocument();
  });

  it("renders the Standard Terms heading", () => {
    render(<NdaPreview data={getDefaultFormData()} />);
    expect(
      screen.getByRole("heading", { name: /standard terms/i })
    ).toBeInTheDocument();
  });

  it("renders key standard terms sections", () => {
    render(<NdaPreview data={getDefaultFormData()} />);

    expect(screen.getByText(/1\. Introduction\./)).toBeInTheDocument();
    expect(screen.getByText(/3\. Exceptions\./)).toBeInTheDocument();
    expect(screen.getByText(/5\. Term and Termination\./)).toBeInTheDocument();
    expect(screen.getByText(/8\. Disclaimer\./)).toBeInTheDocument();
    expect(screen.getByText(/11\. General\./)).toBeInTheDocument();
  });

  it("displays the purpose from form data in the cover page", () => {
    const data = {
      ...getDefaultFormData(),
      purpose: "Exploring a joint venture",
    };
    render(<NdaPreview data={data} />);

    const purposeElements = screen.getAllByText("Exploring a joint venture");
    expect(purposeElements.length).toBeGreaterThanOrEqual(1);
  });

  it("displays governing law from form data", () => {
    const data = { ...getDefaultFormData(), governingLaw: "California" };
    render(<NdaPreview data={data} />);

    const elements = screen.getAllByText("California");
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it("displays jurisdiction from form data", () => {
    const data = {
      ...getDefaultFormData(),
      jurisdiction: "courts located in San Francisco, CA",
    };
    render(<NdaPreview data={data} />);

    const elements = screen.getAllByText(
      "courts located in San Francisco, CA"
    );
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it("shows placeholder text when fields are empty", () => {
    const data = {
      ...getDefaultFormData(),
      governingLaw: "",
      jurisdiction: "",
    };
    render(<NdaPreview data={data} />);

    expect(screen.getAllByText("[State]").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("[City/County, State]").length
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders party details in the signature table", () => {
    const data = {
      ...getDefaultFormData(),
      party1: {
        name: "Alice Smith",
        title: "CEO",
        company: "Acme Corp",
        noticeAddress: "alice@acme.com",
      },
      party2: {
        name: "Bob Jones",
        title: "CTO",
        company: "Beta Inc",
        noticeAddress: "bob@beta.com",
      },
    };
    render(<NdaPreview data={data} />);

    expect(screen.getAllByText("Alice Smith").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Bob Jones").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("CEO")).toBeInTheDocument();
    expect(screen.getByText("CTO")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("Beta Inc")).toBeInTheDocument();
  });

  it("shows the CC BY 4.0 attribution", () => {
    render(<NdaPreview data={getDefaultFormData()} />);
    expect(screen.getByText(/CC BY 4\.0/)).toBeInTheDocument();
  });

  it("forwards ref to the outer div", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<NdaPreview data={getDefaultFormData()} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
