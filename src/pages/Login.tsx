import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DemoAuthCard } from "@/components/demo-auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlatformDemo } from "@/hooks/use-platform-demo";

const Login = () => {
  const navigate = useNavigate();
  const { state, loginAsDemo } = usePlatformDemo();
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    const user = state.users.find((item) => item.email === email);

    if (!user) return;

    loginAsDemo(user.role);
    navigate(`/${user.role}`);
  };

  return (
    <DemoAuthCard
      title="Zaloguj się do demo platformy"
      subtitle="Możesz zalogować się jako istniejący użytkownik demo albo skorzystać z szybkiego wejścia po lewej stronie."
      footerText="Nie masz jeszcze konta?"
      footerLinkLabel="Zarejestruj się"
      footerLinkTo="/register"
    >
      <div className="grid gap-4">
        <Input
          placeholder="Adres e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleLogin}>
          Zaloguj się
        </Button>
      </div>
    </DemoAuthCard>
  );
};

export default Login;