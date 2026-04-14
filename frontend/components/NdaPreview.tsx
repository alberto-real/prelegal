"use client";

import { forwardRef } from "react";
import {
  NdaFormData,
  formatMndaTerm,
  formatConfidentialityTerm,
  formatDate,
} from "@/lib/nda-types";

function Value({
  children,
  placeholder,
}: {
  children: string;
  placeholder: string;
}) {
  const isEmpty = !children.trim();
  return (
    <span
      className={
        isEmpty
          ? "text-gray-400 italic"
          : "text-blue-700 underline decoration-blue-200"
      }
    >
      {isEmpty ? placeholder : children}
    </span>
  );
}

interface NdaPreviewProps {
  data: NdaFormData;
}

const NdaPreview = forwardRef<HTMLDivElement, NdaPreviewProps>(
  function NdaPreview({ data }, ref) {
    const effectiveDateDisplay = formatDate(data.effectiveDate);
    const mndaTerm = formatMndaTerm(data);
    const confidentialityTerm = formatConfidentialityTerm(data);

    return (
      <div
        ref={ref}
        className="bg-white text-gray-900 p-6 sm:p-8 max-w-[800px] mx-auto text-sm leading-relaxed"
      >
        {/* Cover Page */}
        <header className="text-center mb-8 border-b-2 border-gray-800 pb-6">
          <h1 className="text-xl font-bold tracking-wide uppercase">
            Mutual Non-Disclosure Agreement
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            Common Paper MNDA &mdash; Version 1.0
          </p>
        </header>

        <section className="mb-8 space-y-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            This Mutual Non-Disclosure Agreement (the &ldquo;MNDA&rdquo;)
            consists of: (1) this Cover Page and (2) the Common Paper Mutual NDA
            Standard Terms Version 1.0. Any modifications of the Standard Terms
            should be made on the Cover Page, which will control over conflicts
            with the Standard Terms.
          </p>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-500 mb-1">
                Purpose
              </h3>
              <p>
                <Value placeholder="[How Confidential Information may be used]">
                  {data.purpose}
                </Value>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Effective Date
                </h3>
                <p>
                  <Value placeholder="[Date]">{effectiveDateDisplay}</Value>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-500 mb-1">
                  MNDA Term
                </h3>
                <p>{mndaTerm}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-500 mb-1">
                Term of Confidentiality
              </h3>
              <p>{confidentialityTerm}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Governing Law
                </h3>
                <p>
                  <Value placeholder="[State]">{data.governingLaw}</Value>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Jurisdiction
                </h3>
                <p>
                  <Value placeholder="[City/County, State]">
                    {data.jurisdiction}
                  </Value>
                </p>
              </div>
            </div>

            {data.modifications.trim() && (
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-500 mb-1">
                  MNDA Modifications
                </h3>
                <p>{data.modifications}</p>
              </div>
            )}
          </div>
        </section>

        {/* Signature Block */}
        <section className="mb-8">
          <p className="text-xs text-gray-500 mb-3">
            By signing this Cover Page, each party agrees to enter into this
            MNDA as of the Effective Date.
          </p>
          <table className="w-full border-collapse border border-gray-300 text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-1/4">
                  &nbsp;
                </th>
                <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
                  Party 1
                </th>
                <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
                  Party 2
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium bg-gray-50">
                  Signature
                </td>
                <td className="border border-gray-300 px-3 py-4 text-center text-gray-300 italic">
                  {data.party1.name || "_______________"}
                </td>
                <td className="border border-gray-300 px-3 py-4 text-center text-gray-300 italic">
                  {data.party2.name || "_______________"}
                </td>
              </tr>
              {(
                [
                  ["Print Name", "name"],
                  ["Title", "title"],
                  ["Company", "company"],
                  ["Notice Address", "noticeAddress"],
                ] as const
              ).map(([label, field]) => (
                <tr key={field}>
                  <td className="border border-gray-300 px-3 py-2 font-medium bg-gray-50">
                    {label}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <Value placeholder="&mdash;">{data.party1[field]}</Value>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <Value placeholder="&mdash;">{data.party2[field]}</Value>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium bg-gray-50">
                  Date
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {effectiveDateDisplay || "\u2014"}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {effectiveDateDisplay || "\u2014"}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Standard Terms */}
        <section>
          <h2 className="text-lg font-bold text-center mb-6 uppercase tracking-wide">
            Standard Terms
          </h2>

          <div className="space-y-4">
            <p>
              <strong>1. Introduction.</strong> This Mutual Non-Disclosure
              Agreement (which incorporates these Standard Terms and the Cover
              Page) (&ldquo;<strong>MNDA</strong>&rdquo;) allows each party
              (&ldquo;<strong>Disclosing Party</strong>&rdquo;) to disclose or
              make available information in connection with the{" "}
              <Value placeholder="[Purpose]">{data.purpose}</Value> which (1)
              the Disclosing Party identifies to the receiving party (&ldquo;
              <strong>Receiving Party</strong>&rdquo;) as
              &ldquo;confidential&rdquo;, &ldquo;proprietary&rdquo;, or the
              like or (2) should be reasonably understood as confidential or
              proprietary due to its nature and the circumstances of its
              disclosure (&ldquo;<strong>Confidential Information</strong>
              &rdquo;). Each party&rsquo;s Confidential Information also
              includes the existence and status of the parties&rsquo;
              discussions and information on the Cover Page. Confidential
              Information includes technical or business information, product
              designs or roadmaps, requirements, pricing, security and
              compliance documentation, technology, inventions and know-how. To
              use this MNDA, the parties must complete and sign a cover page
              incorporating these Standard Terms (&ldquo;
              <strong>Cover Page</strong>&rdquo;). Each party is identified on
              the Cover Page and capitalized terms have the meanings given herein
              or on the Cover Page.
            </p>

            <p>
              <strong>2. Use and Protection of Confidential Information.</strong>{" "}
              The Receiving Party shall: (a) use Confidential Information solely
              for the <Value placeholder="[Purpose]">{data.purpose}</Value>; (b)
              not disclose Confidential Information to third parties without the
              Disclosing Party&rsquo;s prior written approval, except that the
              Receiving Party may disclose Confidential Information to its
              employees, agents, advisors, contractors and other representatives
              having a reasonable need to know for the{" "}
              <Value placeholder="[Purpose]">{data.purpose}</Value>, provided
              these representatives are bound by confidentiality obligations no
              less protective of the Disclosing Party than the applicable terms
              in this MNDA and the Receiving Party remains responsible for their
              compliance with this MNDA; and (c) protect Confidential
              Information using at least the same protections the Receiving Party
              uses for its own similar information but no less than a reasonable
              standard of care.
            </p>

            <p>
              <strong>3. Exceptions.</strong> The Receiving Party&rsquo;s
              obligations in this MNDA do not apply to information that it can
              demonstrate: (a) is or becomes publicly available through no fault
              of the Receiving Party; (b) it rightfully knew or possessed prior
              to receipt from the Disclosing Party without confidentiality
              restrictions; (c) it rightfully obtained from a third party without
              confidentiality restrictions; or (d) it independently developed
              without using or referencing the Confidential Information.
            </p>

            <p>
              <strong>4. Disclosures Required by Law.</strong> The Receiving
              Party may disclose Confidential Information to the extent required
              by law, regulation or regulatory authority, subpoena or court
              order, provided (to the extent legally permitted) it provides the
              Disclosing Party reasonable advance notice of the required
              disclosure and reasonably cooperates, at the Disclosing
              Party&rsquo;s expense, with the Disclosing Party&rsquo;s efforts
              to obtain confidential treatment for the Confidential Information.
            </p>

            <p>
              <strong>5. Term and Termination.</strong> This MNDA commences on
              the{" "}
              <Value placeholder="[Effective Date]">
                {effectiveDateDisplay}
              </Value>{" "}
              and expires at the end of the MNDA Term ({mndaTerm}). Either party
              may terminate this MNDA for any or no reason upon written notice to
              the other party. The Receiving Party&rsquo;s obligations relating
              to Confidential Information will survive for the Term of
              Confidentiality ({confidentialityTerm}), despite any expiration or
              termination of this MNDA.
            </p>

            <p>
              <strong>
                6. Return or Destruction of Confidential Information.
              </strong>{" "}
              Upon expiration or termination of this MNDA or upon the Disclosing
              Party&rsquo;s earlier request, the Receiving Party will: (a) cease
              using Confidential Information; (b) promptly after the Disclosing
              Party&rsquo;s written request, destroy all Confidential
              Information in the Receiving Party&rsquo;s possession or control
              or return it to the Disclosing Party; and (c) if requested by the
              Disclosing Party, confirm its compliance with these obligations in
              writing. As an exception to subsection (b), the Receiving Party may
              retain Confidential Information in accordance with its standard
              backup or record retention policies or as required by law, but the
              terms of this MNDA will continue to apply to the retained
              Confidential Information.
            </p>

            <p>
              <strong>7. Proprietary Rights.</strong> The Disclosing Party
              retains all of its intellectual property and other rights in its
              Confidential Information and its disclosure to the Receiving Party
              grants no license under such rights.
            </p>

            <p>
              <strong>8. Disclaimer.</strong> ALL CONFIDENTIAL INFORMATION IS
              PROVIDED &ldquo;AS IS&rdquo;, WITH ALL FAULTS, AND WITHOUT
              WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE,
              MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
            </p>

            <p>
              <strong>9. Governing Law and Jurisdiction.</strong> This MNDA and
              all matters relating hereto are governed by, and construed in
              accordance with, the laws of the State of{" "}
              <Value placeholder="[Governing Law]">{data.governingLaw}</Value>,
              without regard to the conflict of laws provisions of such state.
              Any legal suit, action, or proceeding relating to this MNDA must be
              instituted in the federal or state courts located in{" "}
              <Value placeholder="[Jurisdiction]">{data.jurisdiction}</Value>.
              Each party irrevocably submits to the exclusive jurisdiction of
              such courts.
            </p>

            <p>
              <strong>10. Equitable Relief.</strong> A breach of this MNDA may
              cause irreparable harm for which monetary damages are an
              insufficient remedy. Upon a breach of this MNDA, the Disclosing
              Party is entitled to seek appropriate equitable relief, including
              an injunction, in addition to its other remedies.
            </p>

            <p>
              <strong>11. General.</strong> Neither party has an obligation under
              this MNDA to disclose Confidential Information to the other or
              proceed with any proposed transaction. Neither party may assign
              this MNDA without the prior written consent of the other party,
              except that either party may assign this MNDA in connection with a
              merger, reorganization, acquisition or other transfer of all or
              substantially all its assets or voting securities. Any assignment
              in violation of this Section is null and void. This MNDA will bind
              and inure to the benefit of each party&rsquo;s permitted
              successors and assigns. Waivers must be signed by the waiving
              party&rsquo;s authorized representative and cannot be implied from
              conduct. If any provision of this MNDA is held unenforceable, it
              will be limited to the minimum extent necessary so the rest of this
              MNDA remains in effect. This MNDA (including the Cover Page)
              constitutes the entire agreement of the parties with respect to its
              subject matter, and supersedes all prior and contemporaneous
              understandings, agreements, representations, and warranties,
              whether written or oral, regarding such subject matter. This MNDA
              may only be amended, modified, waived, or supplemented by an
              agreement in writing signed by both parties. Notices, requests and
              approvals under this MNDA must be sent in writing to the email or
              postal addresses on the Cover Page and are deemed delivered on
              receipt. This MNDA may be executed in counterparts, including
              electronic copies, each of which is deemed an original and which
              together form the same agreement.
            </p>
          </div>

          <p className="text-xs text-gray-400 text-center mt-8 border-t border-gray-200 pt-4">
            Common Paper Mutual Non-Disclosure Agreement (Version 1.0) &mdash;
            free to use under CC BY 4.0.
          </p>
        </section>
      </div>
    );
  }
);

export default NdaPreview;
