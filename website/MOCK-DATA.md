# Mock data register

Every invented value currently on the site, and who has to replace it.

**Nothing here is real.** These figures exist so the design can be judged as a
finished page. Each one is also tagged with an `<!-- MOCK -->` comment in the
HTML, so `grep -rn "MOCK" .` finds all of them.

**Do not publish, share an external link to, or screenshot this site for
circulation until this file is empty.** The bond terms in particular are a
financial commitment; a wrong figure that reaches an applicant is worse than
no figure at all.

---

## Homepage — `index.html`

| Value shown | Where | Real source needed |
|---|---|---|
| **24 residents currently in training** | Hero facts, decision numbers, chart rows | Programme Office headcount |
| **38 graduates since 2011** | Decision numbers | Programme Office; confirm the correct start year for the residency (Singapore's residency system began 2010, but specialist training predates it) |
| **34 of 38 completed within 60 months** | Decision numbers | Programme Office completion records |
| **36 of 38 traced to a current post** | Decision numbers | Alumni tracing exercise |
| **Cohort sizes 2019–2026** (4/3/4/5/5/5/5/4, n=35) | Chart row labels | Programme Office intake records |
| **Posting pattern in all 480 chart cells** | Sixty-month chart | Programme Office rotation schedules, by month, by intake |
| **S$48,000 MPH fee sponsored** | What this costs you | Finance / Sponsoring Institution |
| **Two years additional service obligation** | What this costs you | The bond instrument itself |
| **Runs consecutively to an existing MOH/PSC bond** | What this costs you | **Legal — this is the single highest-consequence claim on the site.** It may well be concurrent, which is materially better for the applicant |
| **Liquidated damages pro-rated on the unserved portion** | What this costs you | The bond instrument itself |
| **July 2027 intake** | Apply band, CTA | MOH Holdings cycle |
| **Interview registration closes 30 September 2026** | Apply band, CTA | Sponsoring Institution |
| **eResidency portal closes 20 November 2026** | Apply band | MOH Holdings |
| **Information session, 14 October 2026, 6.30pm, NUHS Tower Block** | Contact | Programme Office |
| **Page last verified 1 August 2026 by the Programme Office** | Footer | Whoever actually owns the annual review |

## The other nine pages

All ten pages are now built. The mock figures above are reused across them and must stay
consistent — 24 in training, 38 graduates since 2011, the S$48,000 fee, the two-year consecutive
obligation, and the July 2027 cycle dates all appear on more than one page. Change one, change all.

`grep -rn "MOCK" .` finds all 63 mock markers. `grep -rn 'class="todo"' .` finds all 236
placeholders. Counts by page:

| Page | Placeholders | Mock blocks | Notes |
|---|---|---|---|
| `/` | 5 | 7 | |
| `/what-is-preventive-medicine/` | 33 | 8 | Whole Internal Medicine and Family Medicine comparison columns are empty — we have no verified figures for the competing programmes |
| `/programme/` | 20 | 7 | "A typical week" is an indicative composite, not a real timetable. Completion table sums correctly: 35 entered = 9 completed + 24 in training + 2 left |
| `/programme/training-sites/` | 6 | 5 | The "Typical year" column is inferred from the junior/senior structure, not published |
| `/admissions/` | 25 | 11 | No pay figure is invented anywhere. IMG conditional-registration question left open |
| `/careers/` | 7 | 5 | The 12 job titles are indicative role shapes, **not** attributed to any real graduate. Sector table sums to 36 of 38 traced + 2 of 38 not traced |
| `/alumni/` | **74** | 6 | Highest placeholder count on the site, by design — every field about a real person is empty except the four cohort years already public in your brochure |
| `/people/` | 39 | 6 | Entire faculty roster is placeholder. Resident cohort sizes sum to 24, matching the homepage |
| `/faq/` | 25 | 6 | 16 questions, flat, no accordions |
| `/404.html` | 2 | 2 | |

**Two editorial decisions to review before publishing**, both deliberate and both reversible:

1. **The alumni destinations ledger lists leavers as rows**, including two "Left the programme" and
   one "Left the field", rather than as a footnote. Publishing your own attrition is the most
   expensive-to-fake trust signal available, and burying it is where a sceptical reader looks first
   for what is being hidden. If that is too exposed for an institutional site, it is a one-line change.
2. **`/careers/` ends with a section headed "What the specialty is not"**, written without hedging:
   you rarely have a patient in front of you, results arrive years after decisions, the work is
   often invisible, and private practice income is not this pathway.

**PDPA**: the alumni ledger and the current-residents table are personal data under Singapore's
Personal Data Protection Act, and small cohorts re-identify even unnamed. Written consent per named
row, a de-identified variant, and a published withdrawal contact are needed before real names go in.

## Draft copy awaiting sign-off

- **Programme Director's letter**, paragraphs 2 and 3. The opening paragraph is
  A/Prof Jason Yap's genuine 2018 Singapore Medical Association quote and is
  correctly attributed. The two paragraphs after it are **drafted in his voice
  and are not his words** — they must not be published without his approval.
- **Organisation descriptions** in "Where our residents train" (e.g. "Occupational
  safety, health and workplace exposure standards" for MOM). These are general
  descriptions of what each body does, not statements about the rotation. Confirm
  they match what a resident actually does at each site.

## Deliberately NOT invented

These stayed as visible placeholders because fabricating them would create a
false record about identifiable people or a regulatory status:

- Names, cohort years, postings and contact details of the two current residents
  who take applicant questions
- Programme Office contact details for Ms Fanny Yik and Ms Reena Riana
- Accreditation wording (ACGME-I / Specialists Accreditation Board / JCST).
  A wrong accreditation claim on a residency site is a serious misstatement, so
  the hero carries "2 exit pathways — Public Health, or Occupational Medicine"
  instead, which is supported by the published NUHS page
- Any quote attributed to a named resident or alumnus
- Which ten rotation sites sit across the eight named organisations

## Facts on the page that are real

Carried from the NUHS programme page and the existing brochure, not invented:
60-month duration; fully sponsored part-time MPH at NUS Saw Swee Hock School of
Public Health; the eight participating organisations; the two exit pathways;
A/Prof Jason Yap as Programme Director and his email; Ms Fanny Yik and Ms Reena
Riana as coordinators; the 2018 SMA quotation; Nutri-Grade, the national
childhood immunisation schedule and permissible noise exposure limits as real
Singapore public health instruments.
