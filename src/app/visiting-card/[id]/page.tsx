import { Metadata } from "next";
import VisitingCardPageClient from "../VisitingCardPageClient";

interface PageProps {
  params: Promise<{ id: string }>;
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
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const { id } = await params;
  const user = await getEmployee(id);

  if (!user) {
    return {
      title: "Digital Visiting Card | Inrext",
      description: "View employee digital visiting card",
      openGraph: {
        title: "Digital Visiting Card | Inrext",
        description: "View employee digital visiting card",
        url: `https://staging.inrext.com/visiting-card/${id}`,
        siteName: "Inrext",
        images: [
          {
            url: "https://staging.inrext.com/default-card.png",
            width: 1200,
            height: 630,
          },
        ],
        type: "website",
      },
    };
  }

  return {
    title: `${user.name} | ${user.designation}`,
    description: `${user.specialization || "Digital visiting card"}`,
    openGraph: {
      title: `${user.name} | ${user.designation}`,
      description: `${user.specialization || "Digital visiting card"}`,
      url: `https://staging.inrext.com/visiting-card/${id}`,
      siteName: "Inrext",
      images: [
        {
          url: user.photo,
          width: 1200,
          height: 630,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name} | ${user.designation}`,
      description: `${user.specialization || "Digital visiting card"}`,
      images: [user.photo],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <VisitingCardPageClient id={id} />;
}