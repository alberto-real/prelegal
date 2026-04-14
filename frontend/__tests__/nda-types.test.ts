import { describe, it, expect } from "vitest";
import {
  getDefaultFormData,
  formatMndaTerm,
  formatConfidentialityTerm,
  formatDate,
  NdaFormData,
} from "@/lib/nda-types";

describe("getDefaultFormData", () => {
  it("returns default form data with today's date", () => {
    const data = getDefaultFormData();
    const today = new Date().toISOString().split("T")[0];

    expect(data.effectiveDate).toBe(today);
    expect(data.purpose).toContain("business relationship");
    expect(data.mndaTermType).toBe("fixed");
    expect(data.mndaTermYears).toBe("1");
    expect(data.confidentialityTermType).toBe("fixed");
    expect(data.confidentialityTermYears).toBe("1");
    expect(data.governingLaw).toBe("");
    expect(data.jurisdiction).toBe("");
    expect(data.modifications).toBe("");
    expect(data.party1).toEqual({
      name: "",
      title: "",
      company: "",
      noticeAddress: "",
    });
    expect(data.party2).toEqual({
      name: "",
      title: "",
      company: "",
      noticeAddress: "",
    });
  });

  it("returns a new object on each call", () => {
    const a = getDefaultFormData();
    const b = getDefaultFormData();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });
});

describe("formatMndaTerm", () => {
  it("formats fixed term with years", () => {
    const data = {
      ...getDefaultFormData(),
      mndaTermType: "fixed" as const,
      mndaTermYears: "2",
    };
    expect(formatMndaTerm(data)).toBe("2 year(s) from Effective Date.");
  });

  it("defaults to 1 year when mndaTermYears is empty", () => {
    const data = {
      ...getDefaultFormData(),
      mndaTermType: "fixed" as const,
      mndaTermYears: "",
    };
    expect(formatMndaTerm(data)).toBe("1 year(s) from Effective Date.");
  });

  it("formats until terminated", () => {
    const data = {
      ...getDefaultFormData(),
      mndaTermType: "untilTerminated" as const,
    };
    expect(formatMndaTerm(data)).toContain("until terminated");
  });
});

describe("formatConfidentialityTerm", () => {
  it("formats fixed term with trade secret clause", () => {
    const data = {
      ...getDefaultFormData(),
      confidentialityTermType: "fixed" as const,
      confidentialityTermYears: "3",
    };
    const result = formatConfidentialityTerm(data);
    expect(result).toContain("3 year(s)");
    expect(result).toContain("trade secret");
  });

  it("defaults to 1 year when confidentialityTermYears is empty", () => {
    const data = {
      ...getDefaultFormData(),
      confidentialityTermType: "fixed" as const,
      confidentialityTermYears: "",
    };
    expect(formatConfidentialityTerm(data)).toContain("1 year(s)");
  });

  it("formats perpetuity", () => {
    const data = {
      ...getDefaultFormData(),
      confidentialityTermType: "perpetuity" as const,
    };
    expect(formatConfidentialityTerm(data)).toBe("In perpetuity.");
  });
});

describe("formatDate", () => {
  it("formats a valid date string", () => {
    const result = formatDate("2026-01-15");
    expect(result).toBe("January 15, 2026");
  });

  it("returns empty string for empty input", () => {
    expect(formatDate("")).toBe("");
  });

  it("formats different months correctly", () => {
    expect(formatDate("2026-06-01")).toBe("June 1, 2026");
    expect(formatDate("2026-12-25")).toBe("December 25, 2026");
  });
});
