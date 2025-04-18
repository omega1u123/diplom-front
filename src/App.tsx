import { BASE_URL } from "@/utils/routesNames";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log(BASE_URL);
  }, []);
  return (
    <>
      <div className="bg-amber-100 size-5">
        <p className="text-2xl">Soemthing</p>
      </div>
    </>
  );
}

export default App;
