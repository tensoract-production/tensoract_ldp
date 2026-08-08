# Product

## Platform

web

## Users

The website serves four audience groups:

- **Customers and partners** evaluating products, technical capability and fit.
- **Investors** looking for evidence of shipped products, traction, direction and
  the team's ability to execute. The company is raising capital, but the website
  must not read like a pitch deck.
- **Candidates** evaluating the company and opportunities to work with the team.
- **People learning about Tensoract** who need a clear company and product overview.

The site remains a company profile rather than an end-user product funnel. Its
primary journeys are to explore products, understand Tensoract, read insights,
consider careers, or start a conversation.

## Product Purpose

Tensoract Co., Ltd builds technology and SaaS products, with practical
e-commerce problems as an important area of expertise. The site exists to define
the company, connect its products into one ecosystem, demonstrate capability and
traction, and show where the company is heading.

Success is a visitor finishing the homepage able to explain what Tensoract does,
recognize Ecombox as a featured product, and choose a relevant next step.

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

**Technical constraints:** Next.js 16 + Payload CMS 3.87 on MongoDB. The public
site remains bilingual under `/vi` and `/en`. For V2, Payload is limited to blog
content: Posts, Categories, Authors and Media. Homepage marketing sections and
product data are code-owned during the wireframe stage.

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
