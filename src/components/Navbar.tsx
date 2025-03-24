"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Container, Menu } from "@chakra-ui/react";
import { DropdownMenu } from "./DropdownMenu";
import { ProfileClient } from "./ProfileClient";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();

  return (
    <Box
      id={"navbar-main"}
      bg="transparent"
      w="100%"
      p="4"
      style={{
        backgroundImage: "url(/polygonal19.jpg)",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Flex h={12} alignItems="center" justifyContent="space-between">
          {/* Left Side: Logo */}
          <HStack alignItems="center">
            <Link href="/">
              <Image src={"/aicvg.png"} width={180} height={0} alt={"logo"} />
            </Link>
          </HStack>
          {/* Mobile Menu Button */}
          <IconButton
            size="md"
            aria-label="Open Menu"
            display={{ base: "flex", md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          {/* Desktop Menu */}
          <HStack as="nav" display={{ base: "none", md: "flex" }} gap={10}>
            <Link href="/">
              <Box
                p={2}
                borderRadius={8}
                _hover={{ bg: "#fff", color: "#000", transition: "0.3s" }}
              >
                Home
              </Box>
            </Link>
            <Link href="/">
              <Box
                p={2}
                borderRadius={8}
                _hover={{ bg: "#fff", color: "#000", transition: "0.3s" }}
              >
                Templates
              </Box>
            </Link>
            <Link href="/genie">
              <Box
                p={2}
                color={"yellow.400"}
                borderRadius={8}
                border={"2px solid"}
                _hover={{ bg: "#fff", color: "#000", transition: "0.3s" }}
              >
                <i className="fa-regular fa-sparkles"></i> Cover Genie
              </Box>
            </Link>
            <Link href="https://rpgavatar.com">
              <Box
                p={2}
                borderRadius={8}
                bg={"purple.950"}
                color={"purple.400"}
                _hover={{
                  bg: "purple.400",
                  color: "purple.950",
                  transition: "0.3s",
                }}
              >
                RpgAvatarAi <i className="fa-solid fa-user-bounty-hunter"></i>
              </Box>
            </Link>
          </HStack>
          <HStack>
            {!user && (
              <a href="/api/auth/login">
                <Box
                  p={2}
                  borderRadius={8}
                  _hover={{ bg: "#fff", color: "#000" }}
                >
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </Box>
              </a>
            )}

            {user && (
              <Box id={"profile-menu-button"}>
                <Menu.Root>
                  <Menu.Trigger>
                    <ProfileClient />
                  </Menu.Trigger>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item asChild>
                        <Link href="/profile">
                          <i className="fa-solid fa-user"></i> Profile
                        </Link>
                      </Menu.Item>

                      <Menu.Item asChild>
                        <Link href="/api/auth/logout">
                          <i className="fa-solid fa-left-from-bracket"></i>{" "}
                          Logout
                        </Link>
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Menu.Root>
              </Box>
            )}
          </HStack>
        </Flex>

        {/* Mobile Menu (Visible when Open) */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/contact">
                Contact
                <a href="/api/auth/login">
                  {/*<AvatarGroup>*/}
                  {/*  <Avatar.Root>*/}
                  {/*    <Avatar.Fallback />*/}
                  {/*    <Avatar.Image />*/}
                  {/*  </Avatar.Root>*/}
                  {/*</AvatarGroup>*/}
                  Login
                </a>
                <a href="/api/auth/logout">Logout</a>
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
