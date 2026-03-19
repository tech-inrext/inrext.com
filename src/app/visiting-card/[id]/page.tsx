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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v0/visiting-card/${id}`,
      { cache: "no-store" }
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
          width: 800,
          height: 800,
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

 
