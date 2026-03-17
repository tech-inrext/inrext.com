import axios from "axios";
import api from "./api";

export type Property = {
  _id: string;

  builderName?: string;
  propertyName?: string;
  projectName?: string;
  description?: string;

  isPublic?: boolean;
  isFeatured?: boolean;
  parentId?: string | null;
  slug: string;
  price?: string;
  minPrice?: number | string;

  minSize?: number | string;
  maxSize?: number | string;
  sizeUnit?: string;

  location?: string | string[];
  nearby?: string[];
  amenities?: string[];
  projectHighlights?: string[];
  status?: string[];
  mapLocation?: { lat: number; lng: number };
  images?: { url: string }[] | string[];
};

const BACKEND_URL = process.env.BACKEND_URL;

export const propertyService = {
  // ✅ LIST PAGE (cards, featured, etc.)
  fetchProperties: async (params?: {
    category?: string;
    featured?: string;
    limit?: string;
  }): Promise<Property[]> => {
    try {
      const { category = "", featured = "false", limit = "12" } = params || {};

      const res = await api.get(
        `/public/property?featured=${featured}&limit=${limit}`,
      );

      const properties: Property[] = Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      // 🔹 Get minSize from subproperties
      const updatedProperties = await Promise.all(
        properties.map(async (property) => {
          try {
            const subRes = await api.get(
              `/public/property?parentId=${property._id}`,
            );

            const subs: Property[] = subRes?.data?.data || [];

            if (subs.length > 0) {
              const sizes = subs
                .map((s) => Number(s.minSize))
                .filter((v) => !isNaN(v));

              if (sizes.length > 0) {
                property.minSize = Math.min(...sizes);
              }

              property.sizeUnit = subs[0]?.sizeUnit || property.sizeUnit;
            }

            return property;
          } catch (err) {
            console.error("Subproperty fetch error:", err);
            return property;
          }
        }),
      );

      return updatedProperties;
    } catch (error) {
      console.error("Property Service Fetch Error:", error);
      return [];
    }
  },

  // ✅ DETAILS PAGE (slug-based)
  fetchPropertyBySlug: async (
    slug: string,
    withChildren = true,
  ): Promise<Property | null> => {
    if (!slug) return null;

    try {
      console.log(
        "Fetching property for slug:",
        slug,
        "withChildren:",
        withChildren,
      );
      const res = await api.get(`/public/property/${slug}`);

      return res.data?.success ? res.data.data : null;
    } catch (error) {
      console.error("Website Slug Fetch Error:", error);
      return null;
    }
  },

  // ✅ SUB-PROPERTIES PAGE (fetch child properties by parent ID)
  getSubProperties: async (parentId: string): Promise<any> => {
    try {
      const res = await api.get(`/public/property?parentId=${parentId}`);
      return res.data ?? { data: [] };
    } catch (error) {
      console.error("Sub-Properties Fetch Error:", error);
      return { data: [] };
    }
  },
};