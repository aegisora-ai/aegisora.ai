
fd44b21b-0c2a-4773-9965-3b91b420482d.png
781fc933-8207-4c29-91ec-9b8bee406f71.png
<div align="center">
  <table>
    <tr>
      <td><img src="assets/aegisora-logo.png" alt="Aegisora Logo" width="90" height="90"></td>
      <td><h1>Aegisora</h1></td>
    </tr>
  </table>

  <p>
    <strong>Open-source runtime security for AI agents.</strong>
  </p>
  <p>
    Intercept every agent action before execution and decide:
    <strong>ALLOW</strong>, <strong>BLOCK</strong>, or <strong>ESCALATE</strong>.
  </p>

  <p>
    <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License">
    </a>
    <a href="https://github.com/aegisora-ai/aegisora.ai/releases">
      <img src="https://img.shields.io/github/v/release/aegisora-ai/aegisora.ai?color=green&label=release" alt="Release">
    </a>
    <a href="https://github.com/aegisora-ai/aegisora.ai/actions">
      <img src="https://img.shields.io/github/actions/workflow/status/aegisora-ai/aegisora.ai/ci.yml?branch=main&label=CI" alt="CI Status">
    </a>
  </p>
  <p>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-14%2B-black" alt="Next.js">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript">
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/TailwindCSS-38B2AC" alt="Tailwind CSS">
    </a>
    <a href="https://discord.gg/8CM3PpQRT5">
      <img src="https://img.shields.io/badge/Discord-Join%20us-5865F2?logo=discord&logoColor=white" alt="Discord">
    </a>
  </p>
  <p>
    <a href="https://www.producthunt.com/posts/aegisora" target="_blank">
      <img src="https://img.shields.io/badge/Product%20Hunt-Featured%20on%20PH-FF6154?style=for-the-badge&logo=producthunt&logoColor=white" alt="Product Hunt Featured">
    </a>
  </p>

  <p>
    <a href="https://aegisora-ai.vercel.app"><strong>Live Demo</strong></a>
    &nbsp;·&nbsp;
    <a href="#-how-risk-classification-works"><strong>How It Works</strong></a>
    &nbsp;·&nbsp;
    <a href="./ARCHITECTURE.md"><strong>Architecture</strong></a>
    &nbsp;·&nbsp;
    <a href="./SECURITY.md"><strong>Security</strong></a>
    &nbsp;·&nbsp;
    <a href="https://discord.gg/8CM3PpQRT5"><strong>Discord</strong></a>
  </p>
</div>

> **Aegisora sits between your AI agent and the systems it can act on.**
> Every tool call is evaluated at runtime before execution.
,  bana şu kodu dzeltbenim istediim şekidle göüksün logomun yeri ve marka ismimin ismi Aegisora bneimki onu düzelteceiz guardrails örnek almaniçi verdim kodu yazar mısın red me dosanın baş kımı kodu  

a60aa94e-82c5-4990-a293-7834247b78cb.png
bak logo ve yazı küçük be orantısız bunu çöz 

39c9b09f-a733-4399-bc8c-215382a7ea2a.png
verdiğin yenisini yaptım bu şekidle oldu 

9aabf8d7-45e1-4bb6-82be-365c748ce7d1.png
bak bu şedle oldu hala olmadın  

dc93444e-3885-4d11-9680-e49d76b5dcdd.png
bak bu şekdile ya büyüt buunu ve logo nun ebatı ile yazını ebatını dengele sadece bunu sitiyroum başka yerleri bozma bu adar neden yapamıyrosun 

2dfcfdc1-cf56-4a57-98db-9bae7da7ef06.png
logo byüüd yazı küçük kaldı onu düzlet 

9262269c-4b39-4eac-8f82-b44734ddde3f.png
bana bu o-fontda AYNSIIN BİRBEİR AYNI FONT OLCUAK SOLAD AEGİSORA NIN LOGOSU VMAVİ SAĞDA DA BU FONTDA Aegisora yazısını ekler misin görsel oluştur  

Edit


Evet, anladım. Burada amacımız sadece README'yi “güzel” yapmak değil; Aegisora'nın GitHub reposunu global, ciddi bir open-source security project gibi göstermek.

Ben birkaç güçlü global repo örneğine baktım. Özellikle Ruff, README mimarisi açısından çok iyi bir referans. Ruff; üstte çok net ürün tanımı, güçlü görsel/benchmark, kısa değer önerisi, ardından Table of Contents ve düzenli dokümantasyon akışı kullanıyor. 

FastAPI de başka bir iyi referans: ürünün ne olduğu ilk bakışta anlaşılıyor ve özellikler doğrudan kullanıcı değerine bağlanıyor. 

Aegisora için benim seçimim: Ruff + modern security-project yaklaşımı
Ama Ruff'ı birebir kopyalamayacağız. Onun README düzenini Aegisora'nın alanına uyarlayacağız.

Aegisora için README'nin yapısını şöyle kurardım:

┌──────────────────────────────────────────────┐
│                                              │
│          [ AEGISORA LOGO + WORDMARK ]        │
│                                              │
│       Open-source runtime security           │
│              for AI agents                   │
│                                              │
│     ALLOW · BLOCK · ESCALATE                │
│                                              │
│ [MIT] [Release] [CI] [TypeScript] [Discord] │
│                                              │
│      Live Demo · Docs · Architecture         │
│                                              │
└──────────────────────────────────────────────┘

Aegisora sits between your AI agent
and the systems it can act on.

              AGENT
                │
                ▼
        ┌───────────────┐
        │   AEGISORA    │
        │ Runtime Guard │
        └───────────────┘
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
      ALLOW    BLOCK   ESCALATE

──────────────────────────────────────────────

## Why Aegisora?

## How It Works

[ büyük mimari görsel ]

## Security Model

[ security flow görseli ]

## Quick Start

```bash
...
Example
...
Architecture
[ architecture diagram ]

Policy & Governance
...

Risk Classification
...

Audit & Observability
...

Supported Providers
OpenAI · Anthropic · Gemini · ...

Roadmap
...

Contributing
...

Security
...

License

### Özellikle 4 tane görsel üretelim

Burada senin Aegisora markasını ciddi şekilde öne çıkarabiliriz.

**1. README Header**

Az önce yaptığımız:

`assets/aegisora-readme-header.png`

Logo + Aegisora wordmark.

**2. Runtime Architecture**

```text
AI AGENT
   ↓
AEGISORA RUNTIME
   ↓
SECURITY
   ↓
POLICY
   ↓
RISK
   ↓
DECISION
 ↙ ↓ ↘
ALLOW BLOCK ESCALATE
   ↓
EXECUTION
   ↓
AUDIT / EVIDENCE
Bu README'nin en önemli görsellerinden biri olur.

3. Security Flow

Mesela:

Agent
  │
  ▼
Tool Call
  │
  ▼
Aegisora
  │
  ├── Identity
  ├── Permission
  ├── Policy
  ├── Risk
  └── Context
        │
        ▼
    Decision
   /    |     \
ALLOW BLOCK ESCALATE
4. Real-world example

Örneğin:

Agent: "Transfer €8,000 to supplier"

        ↓

Aegisora Runtime

        ↓

Policy:
financial.transfer
limit = €5,000

        ↓

BLOCK
Bu, projenin ne yaptığını tek bakışta anlatır.

Farkımız ne olacak?
Şu an README'n “küçük bir GitHub projesi” hissi veriyor.

Hedeflediğimiz yeni README ise:

“Bu gerçekten production-grade bir AI security infrastructure projesi.”

hissini vermeli.

Bunu özellikle senin mevcut Aegisora konseptine göre yapacağım; yani rastgele section eklemeyeceğiz. README'nin bütün akışı:

Problem → Aegisora → Runtime Enforcement → Architecture → Security → Quick Start → Example → Governance → Audit → Integrations → Contributing

şeklinde olacak.

Ruff'ın README'sinde de ürünün ne yaptığı çok hızlı anlaşılabiliyor, ardından Getting Started, Configuration, Contributing, Support ve kullanıcılar gibi bölümlere geçiliyor. 

Benim önerim
Referans repo: Ruff

Yapısal ikinci referans: FastAPI

Görsel dil: Aegisora'nın kendi dark security identity'si

Yani sonunda Ruff'ın profesyonel README disiplinine + Aegisora'nın cybersecurity branding'ine sahip bir README oluşturacağız. Bu, Guardrails AI'nin sadece üst başlığını taklit etmekten çok daha güçlü olur.

Bir sonraki adımda mevcut README'nin tamamını temel alıp Aegisora için sıfırdan profesyonel README mimarisini ve hangi görselleri hangi sırada ekleyeceğimizi çıkaralım.



Pasted markdown(1).md
File
bu şekilde orjinal read me yi aldım 

Evet. Bu dosya Ruff’ın orijinal README’si ve artık elimizde referans alacağımız gerçek yapı var. Özellikle Ruff’ın README’sinde üst bölümde badge’ler, tek cümlelik ürün tanımı, güçlü bir benchmark/görsel alanı, ardından özellikler ve hızlı başlangıç geliyor; sonra Table of Contents, Getting Started, Configuration, Rules, Contributing, Support, Acknowledgements ve License bölümleri devam ediyor. 


Aegisora için aynısını kopyalamayacağız. Ruff’ın profesyonel bilgi mimarisini alıp Aegisora’nın AI security/runtime ürününe uyarlayacağız.

Benim önerdiğim nihai README sırası şu:

Aegisora Header / Logo
        ↓
Badges
        ↓
One-line product definition
        ↓
Core runtime/security visual
        ↓
Why Aegisora?
        ↓
How It Works
        ↓
Architecture
        ↓
Quick Start
        ↓
First Policy / First Tool Call
        ↓
Security Model
        ↓
Risk Classification
        ↓
Audit & Evidence
        ↓
Supported Providers / Integrations
        ↓
Configuration
        ↓
Examples
        ↓
Roadmap
        ↓
Contributing
        ↓
Security
        ↓
Support / Discord
        ↓
License
Ruff'tan özellikle alacağımız 5 şey
1. İlk ekran çok güçlü olacak.
Ruff daha ilk satırlarda projenin ne olduğunu söylüyor: “An extremely fast Python linter and code formatter...” ve hemen ardından görsel/benchmark alanına geçiyor. 


Aegisora'da bunun karşılığı:

Open-source runtime security and governance for AI agents.

ve hemen altında:

Intercept every agent action before execution and decide: ALLOW, BLOCK, or ESCALATE.

Ardından bizim hazırladığımız Aegisora runtime architecture görseli gelecek.

2. Özellikleri kuru bir liste değil, değer önerisi olarak vereceğiz.

Ruff özelliklerini kısa, okunabilir ve somut maddeler halinde sıralıyor. 


Aegisora'da örneğin:

⚡ Runtime enforcement for every tool call
🛡️ Zero-trust execution boundaries
📜 Policy-based governance
⚖️ Risk-aware ALLOW / BLOCK / ESCALATE decisions
🔐 Permission and capability controls
🧾 Immutable audit evidence
🔌 Provider-agnostic integrations
🌎 Open-source and self-hostable
Tabii bunların sadece gerçekten implement edilmiş olanlarını yazacağız.

3. “How it works” bölümü Aegisora'nın merkezi olacak.

Ruff ürününü kullanım üzerinden anlatıyor; Aegisora'da bunun çok daha görsel olması gerekiyor.

Örneğin:

AI AGENT
   │
   │ tool call
   ▼
┌─────────────────────────────┐
│         AEGISORA            │
│                             │
│ Identity                    │
│ Permission                  │
│ Policy                      │
│ Risk Assessment             │
│ Context                     │
└──────────────┬──────────────┘
               │
        ┌──────┼──────┐
        ▼      ▼      ▼
      ALLOW  BLOCK  ESCALATE
               │
               ▼
           EXECUTION
               │
               ▼
        AUDIT / EVIDENCE
Burada bir profesyonel architecture SVG/PNG hazırlamak çok daha etkili olur.

4. Quick Start Ruff tarzında gerçekten çalıştırılabilir olacak.

Ruff README'sinde Getting Started altında installation ve usage doğrudan gerçek komutlarla gösteriliyor. 


Aegisora'da da:

git clone https://github.com/aegisora-ai/aegisora.ai.git
cd aegisora.ai
pnpm install
pnpm dev
sonra ilk governance policy örneği ve ilk tool-call örneği gelecek.

Burada uydurma komut kullanmayacağız; mevcut repo'daki gerçek package scripts ve API'lere göre yazacağız.

5. “Who's Using Aegisora?” gibi bölüm ancak gerçek kullanıcılar varsa gelecek.

Ruff bunu çok güçlü kullanıyor ve büyük projeleri listeliyor. 


Aegisora'da şu an doğrulanmış gerçek kullanıcı/şirket yoksa böyle bir bölüm eklememeliyiz. Onun yerine daha erken aşamada:

Integrations

OpenAI
Anthropic
Gemini
Custom Tools
MCP
...
gibi gerçekten desteklenen entegrasyonları göstermek daha profesyonel olur.

Görsel tarafında da Ruff'ın yaklaşımını uyarlayalım
Ruff README'sinde üstte benchmark sonucu için ayrı bir görsel alanı bulunuyor. 


Aegisora için bunun karşılığı olarak 3 ana görsel yeterli:

assets/aegisora-readme-header.png
Logo + Aegisora wordmark.

assets/aegisora-runtime-architecture.png
Agent → Aegisora → Security → Policy → Risk → Decision → Execution → Audit.

assets/aegisora-security-flow.png
Tool call'un nasıl ALLOW/BLOCK/ESCALATE kararına dönüştüğünü gösteren security flow.

Böylece README görsel olarak güçlü, ama reklam broşürü gibi de görünmez.

Ve en önemlisi: Ruff'ın düzenini Aegisora'nın teknik gerçekliğine göre uyarlayacağız. Ruff'ın README'sinde örneğin Configuration ve Rules ürünün temel parçaları olduğu için ayrı başlıklar var. 

 Aegisora'da ise bunların karşılığı Security Model, Policy, Risk Classification, Audit Evidence olacak.

Bence artık sonraki adım mevcut Aegisora README'nin tamamını bu mimariye göre yeniden kurmak. Bunu yaparken sadece mevcut projede gerçekten bulunan özellikleri kullanacağız; eksik olanları “varmış” gibi yazmayacağız.


tam olarak kusurusz bir şekdie readme.md dosyasını olutlruru musun bana ver  

Hazırladım. README'yi Ruff'ın profesyonel yapısını referans alarak Aegisora'nın mevcut konseptine göre yeniden organize ettim; özellikle runtime security, policy, permission, risk, ALLOW/BLOCK/ESCALATE, audit/evidence, architecture, quick start ve contributing akışını merkeze aldım. Ruff'ın referans README'sindeki üst bölüm ve dokümantasyon yapısını temel aldım. 



Not: README içinde assets/aegisora-readme-header.png ve assets/aegisora-runtime-architecture.png referansları bulunuyor; bunları repo içindeki assets/ klasörüne eklediğimizde görsel yapı doğrudan çalışacak. 



Library
/
README_Aegisora_Professional.md


<div align="center">

<p> <img src="assets/aegisora-readme-header.png" alt="Aegisora" width="760" /> </p>

<p> <strong>Open-source runtime security for AI agents.</strong> </p>

<p> Intercept every agent action before execution and decide: <strong>ALLOW</strong>, <strong>BLOCK</strong>, or <strong>ESCALATE</strong>. </p>

<p> <a href="https://opensource.org/licenses/MIT"> <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"> </a> <a href="https://github.com/aegisora-ai/aegisora.ai/releases"> <img src="https://img.shields.io/github/v/release/aegisora-ai/aegisora.ai?color=green&label=release" alt="Release"> </a> <a href="https://github.com/aegisora-ai/aegisora.ai/actions"> <img src="https://img.shields.io/github/actions/workflow/status/aegisora-ai/aegisora.ai/ci.yml?branch=main&label=CI" alt="CI status"> </a> <a href="https://nextjs.org"> <img src="https://img.shields.io/badge/Next.js-14%2B-black" alt="Next.js"> </a> <a href="https://www.typescriptlang.org/"> <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript"> </a> <a href="https://tailwindcss.com"> <img src="https://img.shields.io/badge/TailwindCSS-38B2AC" alt="Tailwind CSS"> </a> <a href="https://discord.gg/8CM3PpQRT5"> <img src="https://img.shields.io/badge/Discord-Join%20us-5865F2?logo=discord&logoColor=white" alt="Discord"> </a> </p>

<p> <a href="https://www.producthunt.com/posts/aegisora" target="_blank"> <img src="https://img.shields.io/badge/Product%20Hunt-Featured%20on%20PH-FF6154?style=for-the-badge&logo=producthunt&logoColor=white" alt="Product Hunt Featured" /> </a> </p>

<p> <a href="https://aegisora-ai.vercel.app"><strong>Live Demo</strong></a> &nbsp;·&nbsp; <a href="https://github.com/aegisora-ai/aegisora.ai/blob/main/ARCHITECTURE.md"><strong>Architecture</strong></a> &nbsp;·&nbsp; <a href="https://github.com/aegisora-ai/aegisora.ai/blob/main/SECURITY.md"><strong>Security</strong></a> &nbsp;·&nbsp; <a href="https://discord.gg/8CM3PpQRT5"><strong>Discord</strong></a> </p>

</div>

Aegisora sits between your AI agent and the systems it can act on.
Every tool call is evaluated at runtime before execution.

Why Aegisora?
AI agents can do more than generate text. They can call tools, access services, execute workflows, and take actions in external systems.

That makes runtime control a security boundary.

Aegisora provides an open-source runtime layer for evaluating agent actions before execution, applying governance policies, assessing risk, enforcing permissions, and producing an explicit decision:

ALLOW · BLOCK · ESCALATE

The goal is simple:

Let agents act — but never let them act without runtime control.

How It Works
Aegisora is designed to sit directly between an AI agent and the systems it can reach.

┌──────────────────────┐
│       AI AGENT       │
└──────────┬───────────┘
           │
           │  Tool / Action Request
           ▼
┌───────────────────────────────┐
│           AEGISORA            │
│        Runtime Security       │
│                               │
│  Identity · Permission        │
│  Policy · Context · Risk      │
└──────────────┬────────────────┘
               │
               ▼
        ┌───────────────┐
        │    DECISION   │
        └───────┬───────┘
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
      ALLOW   BLOCK   ESCALATE
        │       │        │
        └───────┼────────┘
                ▼
          EXECUTION
                │
                ▼
        AUDIT / EVIDENCE
For the visual architecture overview, see ARCHITECTURE.md.

<p align="center"> <img src="assets/aegisora-runtime-architecture.png" alt="Aegisora runtime architecture" width="900" /> </p>

Core Capabilities
Runtime interception — evaluate agent actions before execution.

Policy enforcement — apply explicit governance rules to agent behavior.

Permission control — restrict what an agent can do and which execution surfaces it can reach.

Risk assessment — evaluate actions in context before they are executed.

Decision enforcement — return ALLOW, BLOCK, or ESCALATE.

Zero-trust execution — treat every agent action as requiring an explicit runtime decision.

Audit and evidence — record security decisions as auditable runtime evidence.

Provider-aware governance — designed to operate across modern AI provider integrations.

Runtime Security Model
Aegisora treats an agent's ability to act as a controlled capability rather than an implicit privilege.

Every request moves through a runtime decision path:

Agent Action
     │
     ▼
┌──────────────┐
│ Interception │
└──────┬───────┘
       ▼
┌──────────────┐
│   Security   │
└──────┬───────┘
       ▼
┌──────────────┐
│    Policy    │
└──────┬───────┘
       ▼
┌──────────────┐
│ Risk Assess. │
└──────┬───────┘
       ▼
┌──────────────┐
│   Decision   │
└──────┬───────┘
       │
   ┌───┼────────┐
   ▼   ▼        ▼
 ALLOW BLOCK  ESCALATE
       │
       ▼
   Execution
       │
       ▼
 Audit / Evidence
This creates a clear enforcement boundary between the agent's reasoning and the external systems it can affect.

Decision Model
Aegisora uses three explicit runtime outcomes:

Decision	Meaning
ALLOW	The requested action satisfies the applicable security and governance requirements and may proceed.
BLOCK	The requested action violates a security or governance requirement and must not execute.
ESCALATE	The requested action requires additional review, control, or handling before execution.
The important property is that the decision happens before the action is executed.

Risk Classification
Aegisora evaluates agent actions in context rather than treating every tool call as equivalent.

The runtime can use factors such as:

requested capability,

selected tool or execution surface,

applicable policy,

permissions,

contextual risk,

and the consequences of allowing the action.

The result feeds the runtime decision:

LOW / ACCEPTABLE RISK
        │
        ▼
      ALLOW

HIGH / DISALLOWED RISK
        │
        ▼
      BLOCK

REQUIRES ADDITIONAL CONTROL
        │
        ▼
    ESCALATE
For the detailed implementation and security model, see SECURITY.md.

Governance Policies
Policies define what an agent is allowed to do at runtime.

A policy can be used to express governance requirements around:

permitted capabilities,

restricted actions,

execution boundaries,

risk thresholds,

and escalation conditions.

The intent is to keep governance explicit, reviewable, and enforceable at runtime instead of relying only on prompts or application-level conventions.

Audit & Evidence
Runtime decisions should be observable and explainable.

Aegisora records security decisions as audit/evidence data so teams can understand:

WHO
  ↓
requested WHAT
  ↓
using WHICH capability
  ↓
under WHICH policy
  ↓
with WHICH risk assessment
  ↓
resulting in WHICH decision
This provides a traceable security boundary for agent activity.

Supported Providers
Aegisora is designed to work with modern AI agent stacks and provider integrations.

Current provider integrations include:

OpenAI

Anthropic

Gemini

The runtime model is intended to remain provider-agnostic: the security and governance decision should be enforced at the runtime boundary rather than being tied to a single model provider.

Quick Start
Clone the repository and install the dependencies:

git clone https://github.com/aegisora-ai/aegisora.ai.git
cd aegisora.ai
pnpm install
Start the development environment:

pnpm dev
Then open the local development URL reported by Next.js.

For the live project, see the Live Demo.

Project Structure
At a high level, Aegisora is organized around a runtime enforcement path:

Agent
  │
  ▼
Runtime Gateway
  │
  ├── Security
  │
  ├── Policy
  │
  ├── Permission
  │
  ├── Risk Assessment
  │
  └── Decision
        │
        ├── ALLOW
        ├── BLOCK
        └── ESCALATE
              │
              ▼
          Execution
              │
              ▼
        Audit / Evidence
See ARCHITECTURE.md for the detailed architecture.

Examples
Allow a permitted action
Agent
  │
  └── Request tool execution
            │
            ▼
        Aegisora
            │
            ├── policy: permitted
            ├── permission: valid
            └── risk: acceptable
                    │
                    ▼
                  ALLOW
                    │
                    ▼
                Execute
Block a disallowed action
Agent
  │
  └── Request tool execution
            │
            ▼
        Aegisora
            │
            ├── policy: denied
            └── risk: unacceptable
                    │
                    ▼
                  BLOCK
Escalate an ambiguous action
Agent
  │
  └── Request tool execution
            │
            ▼
        Aegisora
            │
            ├── policy: requires review
            └── risk: unresolved
                    │
                    ▼
                ESCALATE
Security
Security is a first-class part of the project.

For the detailed security model, threat considerations, and security guidance, see SECURITY.md.

Please do not disclose security-sensitive information in public issues. For responsible disclosure, follow the project's security guidance.

Architecture
The core architectural principle is:

Agent → Runtime Gateway → Security → Policy → Decision → Execution

Aegisora is designed to enforce governance before an agent action crosses into the systems it can affect.

See ARCHITECTURE.md for the full architecture documentation.

Roadmap
Aegisora is being developed as an open-source runtime security and governance layer for autonomous AI agents.

The project roadmap focuses on strengthening:

runtime policy enforcement,

permission and capability controls,

contextual risk assessment,

auditability and evidence,

provider and tool integrations,

and production-grade governance.

See the repository's Issues and Releases for the current project status.

Contributing
Contributions are welcome.

Before opening a pull request:

Review the existing architecture and security model.

Keep runtime enforcement behavior explicit and testable.

Add or update tests for security-sensitive changes.

Keep documentation aligned with the implementation.

Explain the motivation and impact of non-trivial changes.

For project discussion and community collaboration, join the Aegisora Discord.

Community
GitHub: https://github.com/aegisora-ai/aegisora.ai

Live Demo: https://aegisora-ai.vercel.app

Discord: https://discord.gg/8CM3PpQRT5

Product Hunt: https://www.producthunt.com/posts/aegisora

License
Aegisora is released under the MIT License.

<div align="center">

<strong>Aegisora</strong>

<br />

Zero-Trust Security for AI Agents.

<br /><br />

<a href="https://github.com/aegisora-ai/aegisora.ai"> GitHub </a> · <a href="https://aegisora-ai.vercel.app"> Live Demo </a> · <a href="https://discord.gg/8CM3PpQRT5"> Discord </a>

</div>

