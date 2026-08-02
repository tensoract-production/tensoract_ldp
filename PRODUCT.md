# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: B2B partners and prospective business counterparties.** People evaluating
whether Tensoract is a credible company to work with — partners, enterprise
buyers, and organisations considering a relationship. Their job on this site is
to decide whether the company is real, capable, and worth engaging.

This site is a company profile, not a product funnel. Individual products are
sold on their own properties (e.g. goihangchuan.vn); end users of those products
— Vietnamese online sellers — are not the audience this site is written for.

## Product Purpose

Tensoract Co., Ltd builds SaaS software for the e-commerce sector. This site
exists to **define the company** for a B2B audience: what Tensoract is, what it
has built, and why an outside organisation should take it seriously.

Success is a partner finishing the site able to describe what the company does
and willing to start a conversation.

## Positioning

**Explicitly undecided — do not write copy that locks this in.**

The company is currently raising capital and its positioning is actively being
worked out (confirmed by the user, this session).

Two hard consequences:

- **Never claim "bootstrapped", "self-funded", or "no outside capital".** It is
  no longer accurate and it works against an active raise.
- Do not substitute a new positioning claim invented here. Until the company
  settles it, lead with verifiable capability and shipped work.

## Operating Context

- Founded 2022. Registered at 215 đường 138, P. Tăng Nhơn Phú, Thủ Đức,
  Ho Chi Minh City, Vietnam.
- Team of roughly 7 people.
- Founder: Võ Quốc Thịnh.
- Products operate as separate web properties rather than one platform.
- Audience is read in both Vietnamese and English; Vietnamese is the primary
  drafting language.
- Public content is maintained in Payload CMS by non-developers, so any public
  claim must be changeable without a deploy.

## Capabilities and Constraints

**Products documented so far (4):**

| Product | What it does |
|---|---|
| Ecombox | AI video of the packing process, tied to order codes, to settle return disputes |
| Gói Hàng Chuẩn (goihangchuan.vn) | Multi-carrier parcel and shipment management for online sellers |
| Deligent | AI design platform for businesses |
| TVTS 10 | AI subject-combination guidance for Grade 10 plus school admissions processing |

**Technical constraints:** Next.js 16 + Payload CMS 3.87 on MongoDB. Bilingual
VI/EN through Payload localization, served under `/vi` and `/en`. Products are a
CMS collection; marketing sections are CMS blocks.

**Undecided or unverified product facts:**

- Positioning and funding narrative (see above).
- Contact email. `hello@tensoract.vn` currently appears in the seed data, footer,
  and contact page. **It was invented during development and is not verified.**
  Replace it before the site goes public.
- The company's own site states five products; only the four above are
  identified. The fifth is unknown.
- Ecombox has no verified public URL.

**Known conflict in the current implementation:** the shipped homepage, its hero
stamp, the "what bootstrapped means" section, and one blog post all lead on the
bootstrapped framing, and the hero speaks to online sellers rather than partners.
Both contradict the record above. A full B2B repositioning pass is agreed and
pending.

## Brand Commitments

- Legal name: Tensoract Co., Ltd.
- Bilingual VI/EN, both first-class.
- The user volunteered one reference for what this site should be: a
  company-defining site "kiểu Anthropic". Recorded as given, not expanded into a
  visual direction.

## Evidence on Hand

**Real and citable:**

- Company site tensoract.vn; LinkedIn `company/tensoractio`; GitHub org
  `tensoract-production`.
- Startup Wheel 2024: the founder took Ecombox to the competition. Entry is
  sourced; **no placement or result is confirmed.**
- Named on the company's own site as partners or supporters: Google Cloud,
  Microsoft, AWS, Cloudflare, Startup Wheel, VinUniversity, UII, King Attorney.
- Training activity claimed by the company: 3 courses, 21 learners, 100+ seminars.

**Absent — must not be fabricated:**

- No customer testimonials, case studies, named clients, or press coverage.
- No revenue, user-count, retention, or performance metrics.
- No product screenshots, demo footage, team photos, or partner logo files.
- No verified contact email or phone number.
- No awards beyond the single Startup Wheel 2024 entry.

## Product Principles

1. **Credibility over conversion.** The site's job is to make a partner trust the
   company, not to sign up an online seller.
2. **Never state a funding posture.** Positioning is in motion; copy must survive
   whichever way the raise resolves.
3. **Claim only what an outsider could verify.** Where proof is missing, say
   nothing rather than fill the space — the absences above are load-bearing.
4. **Shipped work is the argument.** Four running products and named
   infrastructure partners are the strongest true evidence available.
5. **Every public claim is editable without a deploy.** Facts that may change
   belong in the CMS, not in code.
