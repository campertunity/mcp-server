const CAMPERTUNITY_API_URL = process.env.CAMPERTUNITY_API_URL || "https://campertunity.com/public/api";
const CAMPERTUNITY_API_KEY = process.env.CAMPERTUNITY_API_KEY;

export class CampertunityClient {
  private get headers(): Record<string, string> {
    const h: Record<string, string> = {};
    if (CAMPERTUNITY_API_KEY) {
      h["Authorization"] = `Bearer ${CAMPERTUNITY_API_KEY}`;
    }
    return h;
  }

  async get(path: string) {
    const response = await fetch(`${CAMPERTUNITY_API_URL}${path}`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Campertunity API error: ${response.statusText}`);
    }

    return response.json();
  }

  async post(path: string, data: any) {
    const response = await fetch(`${CAMPERTUNITY_API_URL}${path}`, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Campertunity API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const campertunityClient = new CampertunityClient();