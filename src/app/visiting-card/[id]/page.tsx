import { Metadata } from "next";
import VisitingCardPageClient from "../VisitingCardPageClient";

interface PageProps {
  params: { id: string };
}

async function getEmployee(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v0/public/employee/${id}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (data.success) return data.data;
    return null;
  } catch (error) {
    console.error("Error fetching employee:", error);
    return null;
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const { id } = params;
  const user = await getEmployee(id);

  const baseUrl = "https://staging.inrext.com";

  // fallback image
  const defaultImage = `${baseUrl}/default-card.png`;

  if (!user) {
    return {
      metadataBase: new URL(baseUrl),

      title: "Digital Visiting Card | Inrext",
      description: "View employee digital visiting card",

      openGraph: {
        title: "Digital Visiting Card | Inrext",
        description: "View employee digital visiting card",
        url: `${baseUrl}/visiting-card/${id}`,
        siteName: "Inrext",
        images: [
          {
            url: defaultImage,
            width: 1200,
            height: 630,
          },
        ],
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title: "Digital Visiting Card | Inrext",
        description: "View employee digital visiting card",
        images: [defaultImage],
      },
    };
  }

  // Ensure photo URL is absolute
  const photoUrl =
    user.photo && user.photo.startsWith("http")
      ? user.photo
      : `${baseUrl}${user.photo || "/default-card.png"}`;

  return {
    metadataBase: new URL(baseUrl),

    title: `${user.name} | ${user.designation}`,
    description: user.specialization || "Digital visiting card",

    openGraph: {
      title: `${user.name} | ${user.designation}`,
      description: user.specialization || "Digital visiting card",
      url: `${baseUrl}/visiting-card/${id}`,
      siteName: "Inrext",
      images: [
        {
          url: photoUrl,
          width: 1200,
          height: 630,
        },
      ],
      type: "profile",
    },

    twitter: {
      card: "summary_large_image",
      title: `${user.name} | ${user.designation}`,
      description: user.specialization || "Digital visiting card",
      images: [photoUrl],
    },
  };
}

export default function Page({ params }: PageProps) {
  return <VisitingCardPageClient id={params.id} />;
}