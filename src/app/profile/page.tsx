"use client";

import {
  Box,
  Container,
  Heading,
  HStack,
  Field,
  Input,
  VStack,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import React from "react";
import { withMask } from "use-mask-input";

export default function Profile() {
  return (
    <Box id={"profile-page"}>
      <Navbar />

      <Container maxW={"6xl"} py={10}>
        <Box color={"var(--dark-brand)"}>
          <Heading mb={5}>Profile</Heading>

          <Box className={"element-wrapper"}>
            <HStack mb={4}>
              <Field.Root>
                <Field.Label>Your Email</Field.Label>
                <Input placeholder="Email" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input placeholder="Full Name" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Preferred Job Title</Field.Label>
                <Input placeholder="Job Title" />
              </Field.Root>
            </HStack>
            <HStack>
              <Field.Root>
                <Field.Label>Street Address</Field.Label>
                <Input placeholder="Address" />
              </Field.Root>
              <Field.Root>
                <Field.Label>State</Field.Label>
                <Input placeholder="State" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Zip</Field.Label>
                <Input placeholder="Zip" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Phone</Field.Label>
                <Input
                  placeholder="(99) 99999-9999"
                  ref={withMask("(99) 99999-9999")}
                />
              </Field.Root>
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
