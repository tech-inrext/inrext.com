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
    console.error(error);
    return null;
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const id = params.id;
  const user = await getEmployee(id);

  const baseUrl = "https://staging.inrext.com";

  if (!user) {
    return {
      title: "Digital Visiting Card | Inrext",
      description: "View employee digital visiting card",
      openGraph: {
        title: "Digital Visiting Card | Inrext",
        description: "View employee digital visiting card",
        url: `${baseUrl}/visiting-card/${id}`,
        images: [`${baseUrl}/default-card.png`],
      },
    };
  }

  const photoUrl =
    user.photo?.startsWith("http")
      ? user.photo
      : `${baseUrl}${user.photo}`;

  return {
    title: `${user.name} | ${user.designation}`,
    description: user.specialization || "Digital visiting card",

    openGraph: {
      title: `${user.name} | ${user.designation}`,
      description: user.specialization || "Digital visiting card",
      url: `${baseUrl}/visiting-card/${id}`,
      images: [photoUrl],
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