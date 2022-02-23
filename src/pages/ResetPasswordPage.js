import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Container,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "../components/Card";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const query = useQuery();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const toast = useToast();

  console.log(query.get("mode"), query.get("oobCode"));
  return (
    <Container>
      <Header />
      <Heading textAlign="center" my={12} mt={20} size="xl">
        Reset Password
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await resetPassword(query.get("oobCode"), password);
              toast({
                description: "Password has been changed, you can login now.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              history.push("/login");
            } catch (error) {
              toast({
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              console.log(error.message);
            }
          }}
        >
          <Stack spacing="6">
            <FormControl id="password">
              <FormLabel>New password</FormLabel>
              <Input
                type="password"
                autoComplete="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorscheme="pink" size="lg" fontSize="md">
              Reset password
            </Button>
          </Stack>
        </chakra.form>
      </Card>
    </Container>
  );
}
