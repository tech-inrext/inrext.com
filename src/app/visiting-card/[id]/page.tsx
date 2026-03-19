import { Metadata } from "next";
import VisitingCardClient from "./VisitingCardClient";

type Props = {
<<<<<<< HEAD
  params: Promise<{
    id: string;
  }>;
};

// Dummy employee data with profile photo
const dummyEmployee = {
  name: "Prince Ojha",
  email: "princeojha783@gmail.com",
  phone: "7991961411",
  altPhone: "",
  designation: "SDE-1",
  photo: "https://i.postimg.cc/GhvkLtbT/Whats-App-Image-2026-03-13-at-17-54-31.jpg",
  specialization: "Software Development",
  company: "Inrext",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const user = dummyEmployee;

  const profileImage =
    user?.photo && user.photo.startsWith("http")
      ? user.photo
      : "https://inrext.com/default-profile.png";
=======
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
>>>>>>> 5d57175fde2c8850d9a320ce510187e316660df5

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
<<<<<<< HEAD
}
=======
}

 
>>>>>>> 5d57175fde2c8850d9a320ce510187e316660df5
