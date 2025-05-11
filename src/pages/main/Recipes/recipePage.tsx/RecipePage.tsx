import { useGetRecipe } from "@/hooks/useGetRecipe";

export default function RecipePage() {
  const id = "";
  const recipe = useGetRecipe({ id });
  return <div>RecipePage</div>;
}
