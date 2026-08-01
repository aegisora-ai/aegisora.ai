# Contributing to Aegisora

First off — thank you for considering contributing to Aegisora. This project exists to make autonomous AI agents safer to deploy in production, and it's meant to grow through the community, not a single team. Every contribution counts, whether it's a one-line fix or a new detection module.

## Ways to Contribute

You don't need to write code to contribute:

- 🐛 **Report bugs** — open an issue with steps to reproduce
- 💡 **Suggest features** — open an issue tagged `enhancement`
- 📝 **Improve documentation** — typos, unclear setup steps, missing examples
- 🧪 **Write tests** — especially around the policy engine and injection detection
- 🔧 **Fix issues** — check the [Issues tab](https://github.com/ozereray/aegisora.ai/issues), especially anything labeled `good first issue`
- 🌍 **Translate** — help make docs accessible beyond English

## Getting Started

1. **Fork** the repository and clone your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/aegisora.ai.git
   cd aegisora.ai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your environment:**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your own Supabase and Groq API keys (see the [Getting Started](README.md#-getting-started-locally) section of the README).

4. **Create a branch** for your change:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/short-bug-description
   ```

5. **Run the dev server** and confirm your change works:
   ```bash
   npm run dev
   ```

## Making a Pull Request

1. Keep PRs focused — one fix or one feature per PR, not several unrelated changes bundled together.
2. Write a clear PR description: what changed, why, and how you tested it.
3. Reference the issue number if your PR closes one (e.g. `Closes #12`).
4. Make sure `npm run lint` passes before submitting.
5. Be responsive to review feedback — most PRs need at least one round of small revisions, that's normal.

## Code Style

- TypeScript for all new code, no plain JS files.
- Follow the existing ESLint config (`npm run lint` will flag issues).
- Keep components small and composable — if a file is doing too much, it probably needs splitting.
- Comment on _why_, not _what_ — the code should already say what it does.

## Reporting Security Vulnerabilities

If you find a security issue in the policy engine, proxy layer, or auth flow, **please do not open a public issue**. Instead, contact the maintainer directly so it can be fixed before disclosure. Details will be added to a `SECURITY.md` shortly.

## Recognition

Every contributor is listed in the project's Contributors section, regardless of the size of their contribution. This project is built by its community, and that community deserves visible credit for the work put in.

## Questions?

Open a [Discussion](https://github.com/ozereray/aegisora.ai/discussions) or an issue tagged `question` — there's no such thing as a bad question when you're just getting oriented in a new codebase.

Thanks again for being here. Let's make autonomous agents safer, together.
