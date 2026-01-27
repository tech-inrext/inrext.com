import api from "./api";

export async function fetchPillarsByCategory(category: string) {
  try {
    const res = await api.get(
      `/pillars?category=${encodeURIComponent(category)}`
    );

    if (!res) {
      console.error("Pillars API error:", res);
      return [];
    }

    return res.data || [];
  } catch (error) {
    console.error("Failed to fetch pillars:", error);
    return [];
  }
}