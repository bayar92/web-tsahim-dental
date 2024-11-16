import { useEffect, useState } from "react";

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<{
    id: string;
    country: "mn";
    getFlag: (key: string) => string | boolean | undefined;
  }>();

  return analytics;
};
