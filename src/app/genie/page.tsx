"use client";

import {
  Box,
  Container,
  HStack,
  VStack,
  Button,
  FileUpload,
  Flex,
  Text,
  Heading,
  Textarea,
  Field,
  Separator,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { HiUpload } from "react-icons/hi";
import { RadioGroupComponent } from "@/components/RadioGroup";
import { Tiptap } from "@/components/tiptap/Tiptap";
import { useAiContext } from "@/context/AiContext";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Switch } from "@chakra-ui/react";
import PdfReader from "@/utils/read-pdf";
//import { downloadHtmlAsPdf, downloadTextAsPdf } from "@/utils/download-pdf";

export default function Genie() {
  const { data, setData } = useAiContext();
  const [instructions, setInstructions] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("instructions", instructions);
      formData.append("jobDescription", jobDescription);
      let _text = "";

      if (checked) {
        _text = resumeText;
      } else {
        if (resumeFile) {
          _text = await PdfReader({ file: resumeFile as File });
        }
      }

      formData.append("resume", _text);

      const res = await axios.post("/api/ai", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res) {
        console.error(`HTTP error! status: ${res}`);
      }

      const text = await res.data;
      setData(text.message);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box id={"page-genie"}>
      <Navbar />
      <Container maxW={"6xl"} py={10}>
        <HStack justifyContent={"start"} alignItems={"top"}>
          <Box
            className={"upload-column"}
            bg={"#fff"}
            color={"#010917"}
            pe={2}
            width={"30%"}
            border={"1px solid #e5e7eb"}
            style={{ position: "relative" }}
            p={4}
            borderRadius={8}
          >
            <VStack height={"70vh"}>
              <Flex
                flexDirection={"column"}
                width={"100%"}
                height={"100%"}
                style={{ overflow: "auto", position: "relative" }}
                id={"genie-info-stack"}
              >
                <Heading size={"md"}>Information</Heading>
                <Text mb={8} fontSize={14} mt={2}>
                  Add your resume and job description below and get an optimized
                  resume. PDF upload is recommended for best results.
                </Text>

                <Switch.Root
                  mb={4}
                  colorPalette={"green"}
                  onCheckedChange={(e) => setChecked(e.checked)}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>
                    {checked ? "Text Input" : "File Upload"}
                  </Switch.Label>
                </Switch.Root>

                {!checked && (
                  <FileUpload.Root>
                    <FileUpload.HiddenInput
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setResumeFile(file);
                      }}
                    />
                    <FileUpload.Trigger asChild>
                      <Button
                        loading={isLoading}
                        _hover={{
                          bg: "var(--light-brand-hover)",
                          transition: "0.3s",
                        }}
                        width={"100%"}
                        color={"#000"}
                        style={{ border: "1px solid #ccc" }}
                        bg={"var(--light-brand)"}
                        size="md"
                      >
                        <HiUpload /> Upload resume
                      </Button>
                    </FileUpload.Trigger>
                    <FileUpload.List />
                  </FileUpload.Root>
                )}
                {checked && (
                  <Box>
                    <Field.Root>
                      <Field.Label>Resume</Field.Label>
                    </Field.Root>
                    <Textarea
                      border={"1px solid #ccc"}
                      mt={2}
                      name={"resumeText"}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Resume"
                    />
                  </Box>
                )}
                <Box>
                  <Field.Root>
                    <Field.Label mt={6}>Job Description</Field.Label>
                  </Field.Root>
                  <Textarea
                    border={"1px solid #ccc"}
                    mt={2}
                    rows={4}
                    name={"jobDescription"}
                    onChange={(e) => setJobDescription(e.target.value)}
                    maxHeight={"150px"}
                    placeholder="Description..."
                  />
                </Box>
                <Box>
                  <Field.Root>
                    <Field.Label mt={6}>
                      AI Instructions
                      <Text fontSize={12} color={"#5e5e5e"}>
                        (optional)
                      </Text>
                    </Field.Label>
                  </Field.Root>
                  <Textarea
                    border={"1px solid #ccc"}
                    mt={2}
                    name={"instructions"}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={2}
                    maxHeight={"150px"}
                    placeholder="Instructions..."
                  />
                </Box>
              </Flex>
            </VStack>
            <Box
              width={"100%"}
              bg={"#f9f9f9"}
              p={4}
              style={{
                position: "absolute",
                borderTop: "1px solid #e5e7eb",
                bottom: "0",
                left: "0",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            >
              <Button
                _hover={{
                  bg: "var(--light-brand-hover)",
                  transition: "0.3s",
                }}
                mt={"auto"}
                width={"100%"}
                color={"#000"}
                loading={isLoading}
                loadingText={"Optimizing..."}
                style={{
                  border: "1px solid #ccc",
                }}
                bg={"var(--light-brand)"}
                onClick={() => fetchData()}
              >
                <i className="fa-regular fa-sparkles"></i> Optimize Resume
              </Button>
              <div style={{ display: "none" }}>
                <div
                  id="html-to-pdf"
                  dangerouslySetInnerHTML={{ __html: data }}
                />
              </div>

              <Button
                mt={3}
                onClick={() =>
                  downloadHtmlAsPdf("html-to-pdf", "optimized-resume.pdf")
                }
              >
                Download PDF
              </Button>
            </Box>
          </Box>
          <Box className={"output-column tiptap"} ps={2} width={"70%"}>
            <Heading color={"var(--dark-brand)"} size={"md"}>
              Optimized Resume
            </Heading>
            <Tiptap text={data ?? ""} loading={isLoading} />
          </Box>
        </HStack>
      </Container>
    </Box>
  );
}
