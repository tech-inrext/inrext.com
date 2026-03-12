import { Metadata } from "next";
import { notFound } from "next/navigation";
import VisitingCardClient from "./VisitingCardClient";

type Props = {
  params: { id: string };
};

async function getEmployeeData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employee/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Employee fetch error:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params?.id) {
    return {
      title: "Visiting Card",
      description: "Digital Visiting Card",
    };
  }

  const user = await getEmployeeData(params.id);

  if (!user) {
    return {
      title: "Employee Not Found",
      description: "Employee information not available",
    };
  }

  const profileImage =
    user.profileImage ||
    "https://staging.inrext.com/default-profile.png";

  const url = `https://staging.inrext.com/visiting-card/${params.id}`;

  return {
    title: `${user.name} | ${user.designation}`,
    description: `${user.name} - ${user.designation} at ${user.company}`,

    openGraph: {
      title: user.name,
      description: user.designation,
      url: url,
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

export default function Page({ params }: Props) {
  if (!params?.id) {
    notFound(); // show 404 page if no ID
  }

  return <VisitingCardClient id={params.id} />;
}