# Aegisora Organization Invite Engine

This tool sends organization invitations only for usernames explicitly
placed into the approved team lists.

Default mode:
DRY_RUN=true

No invitation is sent unless production mode is explicitly enabled.

Safety checks:
- Existing organization members are skipped.
- Existing pending invitations are skipped.
- Unknown users are reported as failures.
- Every result is written to an audit JSON file.
- Team assignment is performed during the organization invitation.