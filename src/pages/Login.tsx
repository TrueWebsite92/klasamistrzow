import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DemoAuthCard } from "@/components/demo-auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlatformDemo } from "@/hooks/use-platform-demo";

const Login = () => {
  const navigate = useNavigate();
  const { login } = usePlatformDemo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = login({ email, password });

    if (!user) return;

    navigate(user.role === "uczen" ? "/uczen" : "/nauczyciel");
  };

  return (
    <DemoAuthCard
      title="Zaloguj się do swojej strefy nauki"
      subtitle="Uzyskaj dostęp do materiałów, lekcji wideo, konsultacji oraz swojej indywidualnej ścieżki nauki."
      footerText="Nie masz jeszcze konta?"
      footerLinkLabel="Załóż konto"
      footerLinkTo="/register"
    >
      <div className="grid gap-4">
        <Input
          placeholder="Adres e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleLogin}>
          Zaloguj się
        </Button>
      </div>
    </DemoAuthCard>
  );
};

export default Login;