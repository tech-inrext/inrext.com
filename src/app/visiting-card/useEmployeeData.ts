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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          setError("No employee ID provided");
          return;
        }

        const apiUrl = `/api/v0/public/employee/${id}`;
        const response = await axios.get(apiUrl, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (response.data.success && response.data.data) {
          setUser(response.data.data);
        } else {
          setError(response.data.error || "Employee not found");
        }
      } catch (error: any) {
        if (error.response) {
          setError(`Server error: ${error.response.status} - ${error.response.data?.error || error.message}`);
        } else if (error.request) {
          setError("Unable to reach the server. Please check your internet connection.");
        } else {
          setError(error.message || "Failed to load employee data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    } else {
      setError("Please provide an employee ID in the URL");
      setLoading(false);
    }
  }, [id]);

  return { user, loading, error };
};

export default useEmployeeData;