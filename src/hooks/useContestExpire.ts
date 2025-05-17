import { useEffect, useState } from "react";

interface useContestExpireProps {
  endDate: string;
}

export const useContestExpire = ({ endDate }: useContestExpireProps) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const now = new Date();
    const contestEnd = new Date(endDate);
    setIsExpired(contestEnd < now);
  }, [endDate]);

  return isExpired;
};
