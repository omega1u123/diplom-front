import { UserRole } from "@/types/userTypes";
import { useEffect, useState } from "react";

interface useUserRoleProps {
  level: number;
  role: UserRole;
}

export const useUserRole = ({ level, role }: useUserRoleProps) => {
  const [newRole, setNewRole] = useState<string>("");
  useEffect(() => {
    if (role === UserRole.User) {
      switch (level) {
        case 1:
          setNewRole("Новичек");
          break;
        case 2:
          setNewRole("Любитель");
          break;
        case 3:
          setNewRole("Опытный");
          break;
        case 4:
          setNewRole("Профессионал");
          break;
      }
    } else if (role === UserRole.Cook) {
      setNewRole("Повар");
    }
  }, [role, level]);

  return newRole;
};
