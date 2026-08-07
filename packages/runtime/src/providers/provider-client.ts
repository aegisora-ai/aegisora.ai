export class ProviderClient {
  async post<T>(
    url: string,
    body: unknown,
    headers: Record<string, string>,
  ): Promise<T> {
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        ...headers,
      },

      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Provider request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}
