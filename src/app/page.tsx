import Image from "next/image";
import { Button, Container, HStack } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container py={10}>
        <h1>Home</h1>
      </Container>
      <footer>
        <Container>
          <div>Footer</div>
        </Container>
      </footer>
    </>
  );
}
