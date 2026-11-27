import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("muine2026-trip-store");
  const key = "shared-trip-v1";

  try {
    if (req.method === "GET") {
      const entry = await store.get(key, { type: "json" });
      if (!entry || !entry.tripData) {
        return Response.json(
          { exists: false, data: null, updatedAt: 0 },
          { headers: { "Cache-Control": "no-store" } }
        );
      }
      return Response.json(
        { exists: true, data: entry.tripData, updatedAt: entry.updatedAt || 0 },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    if (req.method === "POST") {
      const body = await req.json();
      if (!body || !body.tripData) {
        return Response.json({ error: "Invalid payload" }, { status: 400 });
      }
      const updatedAt = Date.now();
      await store.setJSON(key, {
        tripData: body.tripData,
        updatedAt
      });
      return Response.json(
        { ok: true, updatedAt },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    return new Response("Method not allowed", { status: 405 });
  } catch (err) {
    return Response.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
};

export const config = {
  path: "/api/trip"
};
