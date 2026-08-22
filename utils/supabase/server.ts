import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getRequiredEnv(name: string): string {
const value = process.env[name];

if (!value) {
throw new Error(
`[Supabase] Missing required environment variable: ${name}`,
);
}

return value;
}

export async function createClient() {
const cookieStore = await cookies();

const supabaseUrl = getRequiredEnv(
"NEXT_PUBLIC_SUPABASE_URL",
);

const supabaseAnonKey = getRequiredEnv(
"NEXT_PUBLIC_SUPABASE_ANON_KEY",
);

return createServerClient(supabaseUrl, supabaseAnonKey, {
cookies: {
getAll() {
return cookieStore.getAll();
},

```
  setAll(cookiesToSet) {
    try {
      for (const {
        name,
        value,
        options,
      } of cookiesToSet) {
        cookieStore.set(name, value, options);
      }
    } catch {
      /*
       * Server Components may not be allowed to mutate cookies.
       * Session refresh is handled by the application's middleware
       * when configured.
       */
    }
  },
},
```

});
}
