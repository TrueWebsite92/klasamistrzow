import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DemoAuthCard } from "@/components/demo-auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePlatformDemo } from "@/hooks/use-platform-demo";
import type { UserRole } from "@/lib/platform-types";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = usePlatformDemo();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("student");

  const handleRegister = () => {
    const user = registerUser({ name, email, role });
    navigate(`/${user.role}`);
  };

  return (
    <DemoAuthCard
      title="Załóż konto demo"
      subtitle="Po rejestracji użytkownik automatycznie otrzymuje dostęp do darmowych materiałów i może od razu wejść do odpowiedniego panelu."
      footerText="Masz już konto?"
      footerLinkLabel="Zaloguj się"
      footerLinkTo="/login"
    >
      <div className="grid gap-4">
        <Input placeholder="Imię i nazwisko" value={name} onChange={(event) => setName(event.target.value)} />
        <Input placeholder="Adres e-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz rolę" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">student</SelectItem>
            <SelectItem value="teacher">teacher</SelectItem>
            <SelectItem value="admin">admin</SelectItem>
          </SelectContent>
        </Select>
        <Button className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]" onClick={handleRegister}>
          Zarejestruj konto
        </Button>
      </div>
    </DemoAuthCard>
  );
};

export default Register;