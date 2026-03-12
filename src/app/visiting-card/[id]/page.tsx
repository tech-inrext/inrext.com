import { Metadata } from "next";
import VisitingCardClient from "../VisitingCardClient";

type Props = {
  params: {
    id: string;
  };
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
  const id = params?.id;

  if (!id) {
    return {
      title: "Visiting Card",
      description: "Digital Visiting Card",
    };
  }

  const user = await getEmployeeData(id);

  if (!user) {
    return {
      title: "Employee Not Found",
      description: "Employee information not available",
    };
  }

const profileImage =
  user?.profileImage && user.profileImage.startsWith("http")
    ? user.profileImage
    : "https://staging.inrext.com/default-profile.png";

  const url = `https://staging.inrext.com/visiting-card/${id}`;

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
  const id = params?.id;

  return <VisitingCardClient id={id} />;
}