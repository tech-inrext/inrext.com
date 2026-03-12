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
    if (!id) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/public/employee/${id}`;

        const response = await axios.get(apiUrl);

        if (response.data) {
          setUser(response.data);
        } else {
          setError("Employee not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  return { user, loading, error };
};

export default useEmployeeData;