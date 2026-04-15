"use client";

import { NdaFormData, PartyInfo } from "@/lib/nda-types";

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-vertical"
      />
    </label>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
      {children}
    </h3>
  );
}

function PartyFields({
  label,
  party,
  onChange,
}: {
  label: string;
  party: PartyInfo;
  onChange: (party: PartyInfo) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <SectionHeading>{label}</SectionHeading>
      <InputField
        label="Full Name"
        value={party.name}
        onChange={(v) => onChange({ ...party, name: v })}
        placeholder="Jane Smith"
      />
      <InputField
        label="Title"
        value={party.title}
        onChange={(v) => onChange({ ...party, title: v })}
        placeholder="CEO"
      />
      <InputField
        label="Company"
        value={party.company}
        onChange={(v) => onChange({ ...party, company: v })}
        placeholder="Acme Corp."
      />
      <InputField
        label="Notice Address"
        value={party.noticeAddress}
        onChange={(v) => onChange({ ...party, noticeAddress: v })}
        placeholder="email@company.com"
      />
    </fieldset>
  );
}

export default function NdaForm({ data, onChange }: NdaFormProps) {
  const update = <K extends keyof NdaFormData>(
    field: K,
    value: NdaFormData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-6"
    >
      {/* Agreement Details */}
      <section className="space-y-3">
        <SectionHeading>Agreement Details</SectionHeading>
        <TextAreaField
          label="Purpose"
          value={data.purpose}
          onChange={(v) => update("purpose", v)}
          placeholder="How Confidential Information may be used"
        />
        <InputField
          label="Effective Date"
          type="date"
          value={data.effectiveDate}
          onChange={(v) => update("effectiveDate", v)}
        />
      </section>

      {/* MNDA Term */}
      <section className="space-y-3">
        <SectionHeading>MNDA Term</SectionHeading>
        <div className="space-y-2">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="mndaTermType"
              value="fixed"
              checked={data.mndaTermType === "fixed"}
              onChange={() => update("mndaTermType", "fixed")}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              Expires after a fixed period
            </span>
          </label>
          {data.mndaTermType === "fixed" && (
            <div className="ml-6">
              <InputField
                label="Years"
                type="number"
                value={data.mndaTermYears}
                onChange={(v) => update("mndaTermYears", v)}
                placeholder="1"
              />
            </div>
          )}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="mndaTermType"
              value="untilTerminated"
              checked={data.mndaTermType === "untilTerminated"}
              onChange={() => update("mndaTermType", "untilTerminated")}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              Continues until terminated
            </span>
          </label>
        </div>
      </section>

      {/* Term of Confidentiality */}
      <section className="space-y-3">
        <SectionHeading>Term of Confidentiality</SectionHeading>
        <div className="space-y-2">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="confidentialityTermType"
              value="fixed"
              checked={data.confidentialityTermType === "fixed"}
              onChange={() => update("confidentialityTermType", "fixed")}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              Fixed period (trade secrets protected longer)
            </span>
          </label>
          {data.confidentialityTermType === "fixed" && (
            <div className="ml-6">
              <InputField
                label="Years"
                type="number"
                value={data.confidentialityTermYears}
                onChange={(v) => update("confidentialityTermYears", v)}
                placeholder="1"
              />
            </div>
          )}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="confidentialityTermType"
              value="perpetuity"
              checked={data.confidentialityTermType === "perpetuity"}
              onChange={() => update("confidentialityTermType", "perpetuity")}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">In perpetuity</span>
          </label>
        </div>
      </section>

      {/* Governing Law & Jurisdiction */}
      <section className="space-y-3">
        <SectionHeading>Governing Law & Jurisdiction</SectionHeading>
        <InputField
          label="Governing Law (State)"
          value={data.governingLaw}
          onChange={(v) => update("governingLaw", v)}
          placeholder="California"
        />
        <InputField
          label="Jurisdiction"
          value={data.jurisdiction}
          onChange={(v) => update("jurisdiction", v)}
          placeholder="courts located in San Francisco, CA"
        />
      </section>

      {/* Modifications */}
      <section className="space-y-3">
        <SectionHeading>MNDA Modifications</SectionHeading>
        <TextAreaField
          label="Modifications (optional)"
          value={data.modifications}
          onChange={(v) => update("modifications", v)}
          placeholder="List any modifications to the standard terms..."
          rows={2}
        />
      </section>

      {/* Parties */}
      <section className="space-y-6">
        <PartyFields
          label="Party 1"
          party={data.party1}
          onChange={(p) => update("party1", p)}
        />
        <PartyFields
          label="Party 2"
          party={data.party2}
          onChange={(p) => update("party2", p)}
        />
      </section>
    </form>
  );
}
