import { UserRole } from "@/types/userTypes";

interface useUserRoleProps {
  level: number;
  role: UserRole;
}

export const useUserRole = ({ level, role }: useUserRoleProps) => {
  if (role === UserRole.User) {
    switch (level) {
      case 1:
        return "Новичек";
      case 2:
        return "Любитель";
      case 3:
        return "Опытный";
      case 4:
        return "Профессионал";
    }
  } else if (role === UserRole.Cook) {
    return "Повар";
  }
};
