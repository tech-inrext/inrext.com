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
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const user = await getEmployee(params.id);

  if (!user) {
    return {
      title: "Digital Visiting Card | Inrext",
      description: "View employee digital visiting card",
    };
  }

  return {
    title: `${user.name} | ${user.designation}`,
    description: `${user.specialization || ""}`,
    openGraph: {
      title: `${user.name} | ${user.designation}`,
      description: `${user.specialization || ""}`,
      url: `https://www.inrext.com/visiting-card/${params.id}`,
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
  };
}

export default function Page({ params }: PageProps) {
  return <VisitingCardPageClient id={params.id} />;
}