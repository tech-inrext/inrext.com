import { Metadata } from "next";
import VisitingCardClient from "./VisitingCardClient";

type Props = {
  params: {
    id: string;
  };
};

async function getEmployeeData(id: string) {
  try {
    const res = await fetch(
      `${process.env.INREXT_WEBSITE_URL}/api/v0/visiting-card/${id}`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Employee fetch error:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const response = await getEmployeeData(id);
  const user = response?.data;
  if (!user) {
    return {
      title: "Employee Not Found",
      description: "Employee information not available",
    };
  }

  const profileImage =
    user?.profileImage && user.profileImage.startsWith("http")
      ? user.profileImage
      : "https://inrext.com/default-profile.png";

  return {
    metadataBase: new URL("https://inrext.com"),
    title: `${user.name} | ${user.designation}`,
    description: `${user.name} - ${user.designation} at ${user.company}`,

    openGraph: {
      title: user.name,
      description: user.designation,
      url: `https://inrext.com/visiting-card/${id}`,
      siteName: "Inrext",
      images: [
        {
          url: profileImage,
          width: 1200,
          height: 630,
        },
      ],
      type: "profile",
    },

    twitter: {
      card: "summary_large_image",
      title: user.name,
      description: user.designation,
      images: [profileImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <VisitingCardClient id={id} />;
}
