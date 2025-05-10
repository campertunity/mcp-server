const CAMPERTUNITY_API_URL = process.env.CAMPERTUNITY_API_URL || "https://us-central1-my-project-1517611279378.cloudfunctions.net/public/api";
const CAMPERTUNITY_API_KEY = process.env.CAMPERTUNITY_API_KEY;

if (!CAMPERTUNITY_API_KEY) {
  throw new Error("CAMPERTUNITY_API_KEY environment variable is required");
}

export class CampertunityClient {
  async get(path: string) {
    const response = await fetch(`${CAMPERTUNITY_API_URL}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CAMPERTUNITY_API_KEY}`,
      },
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
        Authorization: `Bearer ${CAMPERTUNITY_API_KEY}`,
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