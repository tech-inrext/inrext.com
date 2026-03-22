"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  designation?: string;
  photo?: string;
  email?: string;
  phone?: string;
  altPhone?: string;
  specialization?: string;
}

const useEmployeeData = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No employee ID provided");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v0/public/employee/${id}`;

        const res = await axios.get(url);

        console.log("API RESPONSE:", res.data);

        if (res.data?.success && res.data?.data) {
          setUser(res.data.data);
        } else {
          setError("Employee not found");
        }
      } catch (err: any) {
        console.error("Fetch error:", err);

        if (err.response) {
          setError(
            `Server error: ${err.response.status} - ${
              err.response.data?.error || err.message
            }`
          );
        } else if (err.request) {
          setError("Unable to reach server");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  return { user, loading, error };
};

export default useEmployeeData;