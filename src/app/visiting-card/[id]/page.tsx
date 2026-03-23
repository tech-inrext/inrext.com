import { Metadata } from "next";
import VisitingCardClient from "./VisitingCardClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// ✅ Safe server fetch
async function getEmployeeData(id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v0/public/employee/${id}`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    const text = await res.text();

    // 🔥 Handle non-JSON safely
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Invalid JSON response:", text);
      return null;
    }

    if (!res.ok || !data?.success) {
      console.error("API Error:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Employee fetch error:", error);
    return null;
  }
}

// ✅ Metadata
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

// ✅ Page
export default async function Page({ params }: Props) {
  const { id } = await params;

  return <VisitingCardClient id={id} />;
}