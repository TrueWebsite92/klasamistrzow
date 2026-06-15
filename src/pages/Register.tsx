import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DemoAuthCard } from "@/components/demo-auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlatformDemo } from "@/hooks/use-platform-demo";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = usePlatformDemo();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const user = registerUser({ name, email, password });
    navigate(user.role === "uczen" ? "/uczen" : "/nauczyciel");
  };

  return (
    <DemoAuthCard
      title="Załóż konto"
      subtitle="Po założeniu konta od razu otrzymasz dostęp do materiałów darmowych i swojej strefy nauki."
      footerText="Masz już konto?"
      footerLinkLabel="Zaloguj się"
      footerLinkTo="/login"
    >
      <div className="grid gap-4">
        <Input placeholder="Imię i nazwisko" value={name} onChange={(event) => setName(event.target.value)} />
        <Input placeholder="Adres e-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input type="password" placeholder="Hasło" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleRegister}>
          Załóż konto
        </Button>
      </div>
    </DemoAuthCard>
  );
};

export default Register;