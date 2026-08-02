# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: B2B partners and prospective business counterparties**, confirmed as
two groups:

- **Investors.** Assessing whether this team executes. They need evidence of
  shipping and momentum — never a statement about funding posture.
- **Enterprises buying for internal use.** Assessing whether the software can
  run inside their own operation. They need scale, reliability, and
  operational-commitment signals.

Their job on this site is to decide whether the company is real, capable, and
worth engaging. **The action they should take is to email the company directly**
— no booking flow, no gated download.

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

**Product model — Ecombox at the centre.** Confirmed by the user after the first
build: the company story leads on Ecombox and the solutions that deploy
alongside it. Everything else is maintained but not led with.

| Product | Tier | What it does |
|---|---|---|
| Ecombox | flagship | AI record of the packing process tied to order codes; sold as an enterprise deployment |
| Ecombox ORMI | companion | Ships alongside Ecombox for enterprise deployment. **What ORMI actually does is not known** — the site carries a marked shell until the team writes it |
| Deligent | side | AI design platform for businesses |
| TVTS 10 | side | AI subject-combination guidance plus school admissions processing |

**Gói Hàng Chuẩn is retired as a product name.** The user confirmed it was the
former name and predecessor of this work; it is folded into Ecombox and must not
reappear as a separate product. `goihangchuan.vn` may still resolve as a domain.

**Technical constraints:** Next.js 16 + Payload CMS 3.87 on MongoDB. Bilingual
VI/EN through Payload localization, served under `/vi` and `/en`. Products are a
CMS collection; marketing sections are CMS blocks.

**Undecided or unverified product facts:**

- Positioning and funding narrative (see above).
- Contact email. `hello@tensoract.vn` currently appears in the seed data, footer,
  and contact page. **It was invented during development and is not verified.**
  Replace it before the site goes public.
- What Ecombox ORMI does. The site ships a shell marked "[Chờ nội dung]".
- The company's own site states five products; four are identified above.
- Release history. The Releases collection exists and the home page section is
  wired, but it holds one placeholder row — real versions and dates must come
  from the team.
- Ecombox has no verified public URL.

**What the site provides**, as stated on the home page: Ecombox deployed at
warehouse scale, fitting it to systems the enterprise already runs, and training
and handover. The training figure (100+ seminars, 3 courses) is the company's own
published claim; the other two are descriptions of the deployment work, not
capability claims about integrations with named systems.

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
- No product screenshots, demo footage, team photos, or partner logo files. The
  user asked for office/team imagery to be **authored as illustration** and
  treated as synthetic until real photography exists.
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
