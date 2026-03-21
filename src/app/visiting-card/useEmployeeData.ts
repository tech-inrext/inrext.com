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

interface UseEmployeeDataResult {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const useEmployeeData = (id: string): UseEmployeeDataResult => {
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

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/public/employee/${id}`
        );

        if (response.data?.data) {
          setUser(response.data.data);
        } else {
          setError("Employee not found");
        }
      } catch (error: any) {
        if (error.response) {
          setError(
            `Server error: ${error.response.status} - ${
              error.response.data?.error || error.message
            }`
          );
        } else if (error.request) {
          setError("Unable to reach the server.");
        } else {
          setError(error.message || "Failed to load employee data");
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