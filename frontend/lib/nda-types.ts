export interface PartyInfo {
  name: string;
  title: string;
  company: string;
  noticeAddress: string;
}

export interface NdaFormData {
  purpose: string;
  effectiveDate: string;
  mndaTermType: "fixed" | "untilTerminated";
  mndaTermYears: string;
  confidentialityTermType: "fixed" | "perpetuity";
  confidentialityTermYears: string;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  party1: PartyInfo;
  party2: PartyInfo;
}

export function getDefaultFormData(): NdaFormData {
  return {
    purpose:
      "Evaluating whether to enter into a business relationship with the other party.",
    effectiveDate: new Date().toISOString().split("T")[0],
    mndaTermType: "fixed",
    mndaTermYears: "1",
    confidentialityTermType: "fixed",
    confidentialityTermYears: "1",
    governingLaw: "",
    jurisdiction: "",
    modifications: "",
    party1: { name: "", title: "", company: "", noticeAddress: "" },
    party2: { name: "", title: "", company: "", noticeAddress: "" },
  };
}

export function formatMndaTerm(data: NdaFormData): string {
  if (data.mndaTermType === "untilTerminated") {
    return "Continues until terminated in accordance with the terms of the MNDA.";
  }
  const years = data.mndaTermYears || "1";
  return `${years} year(s) from Effective Date.`;
}

export function formatConfidentialityTerm(data: NdaFormData): string {
  if (data.confidentialityTermType === "perpetuity") {
    return "In perpetuity.";
  }
  const years = data.confidentialityTermYears || "1";
  return `${years} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
