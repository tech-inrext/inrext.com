import { Metadata } from "next";
import VisitingCardClient from "./VisitingCardClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// Dummy data instead of API
async function getEmployeeData(id: string) {
  return {
    success: true,
    data: {
      name: "Prince Ojha",
      email: "princeojha783@gmail.com",
      phone: "7991961411",
      altPhone: "",
      designation: "SDE-1",
      photo: "",
      specialization: "",
      company: "Inrext"
    }
  };
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