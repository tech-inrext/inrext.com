import { Metadata } from "next";
import VisitingCardClient from "./VisitingCardClient";

type Props = {
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
  photo: "https://i.postimg.cc/NMkN2Fxj/Screenshot-2026-03-13-172839.jpg",
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