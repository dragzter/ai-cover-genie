"use client";

import "./style.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useCurrentEditor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { HStack, Box, Button } from "@chakra-ui/react";
import {
  CustomBulletList,
  Div,
  CustomHeading,
  CustomListItem,
  CustomParagraph,
} from "@/components/tiptap/util";
import { useAiContext } from "@/context/AiContext";

export const Tiptap = ({
  text = "",
  loading = false,
}: {
  text: string;
  loading: boolean;
}) => {
  const [content, setContent] = useState(text);
  const [changed, setChanged] = useState(false);
  const { data, setData } = useAiContext();

  const updateContent = () => {
    setData(content);
    setChanged(false);
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      //TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
      }),
      CustomParagraph,
      CustomHeading,
      CustomListItem,
      CustomBulletList,
      Div,
    ],
    content,
    onUpdate: ({ editor }) => {
      setChanged(true);
      setContent(editor.getHTML());
    },
    parseOptions: {
      preserveWhitespace: "full",
    },
  });

  useEffect(() => {
    if (editor && text !== content) {
      editor.commands.setContent(text);
      setContent(text);
    }
  }, [text, editor]);

  useEffect(() => {
    if (editor && loading) {
      editor.commands.setContent("Loading...");
    }
  }, [loading]);

  if (!editor) return null;

  return (
    <Box>
      <div className="control-group">
        <div className="button-group">
          <HStack>
            <HStack>
              <Box
                className={"text-group"}
                bg={"#f9f9f9"}
                p={2}
                mb={2}
                borderRadius={8}
              >
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "is-active" : ""}
                >
                  <i className="fa-solid fa-bold"></i>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "is-active" : ""}
                >
                  <i className="fa-solid fa-italic"></i>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={editor.isActive("strike") ? "is-active" : ""}
                >
                  <i className="fa-solid fa-strikethrough"></i>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  disabled={!editor.can().chain().focus().toggleCode().run()}
                  className={editor.isActive("code") ? "is-active" : ""}
                >
                  <i className="fa-solid fa-code"></i>
                </button>
                <button
                  title={"Code block"}
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={editor.isActive("codeBlock") ? "is-active" : ""}
                >
                  <i className="fa-solid fa-rectangle-code"></i>
                </button>
              </Box>
            </HStack>
            <HStack>
              <Box
                className={"text-group"}
                bg={"#f9f9f9"}
                p={2}
                mb={2}
                borderRadius={8}
              >
                <button
                  title={"Clear marks"}
                  onClick={() => editor.chain().focus().unsetAllMarks().run()}
                >
                  <i className="fa-solid fa-rectangle-xmark"></i>
                </button>
                <button
                  title={"Clear nodes"}
                  onClick={() => editor.chain().focus().clearNodes().run()}
                >
                  <i className="fa-solid fa-text-slash"></i>
                </button>
              </Box>
            </HStack>
            <HStack>
              <Box
                className={"text-group"}
                bg={"#f9f9f9"}
                p={2}
                mb={2}
                borderRadius={8}
              >
                <button
                  title={"Paragraph"}
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={editor.isActive("paragraph") ? "is-active" : ""}
                >
                  <i className="fa-solid fa-paragraph"></i>
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                  }
                >
                  <i className="fa-solid fa-h1"></i>
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                  }
                >
                  <i className="fa-solid fa-h2"></i>
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                  }
                >
                  <i className="fa-solid fa-h3"></i>
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 4 }) ? "is-active" : ""
                  }
                >
                  <i className="fa-solid fa-h4"></i>
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 5 }) ? "is-active" : ""
                  }
                >
                  <i className="fa-solid fa-h5"></i>
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 6 }) ? "is-active" : ""
                  }
                >
                  <i className="fa-solid fa-h6"></i>
                </button>
              </Box>
            </HStack>
          </HStack>
          <HStack>
            <HStack>
              <Box
                className={"text-group"}
                bg={"#f9f9f9"}
                p={2}
                mb={2}
                borderRadius={8}
              >
                <button
                  title={"Bullet List"}
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                  <i className="fa-solid fa-list-ul"></i>
                </button>
                <button
                  title={"Ordered List"}
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={editor.isActive("orderedList") ? "is-active" : ""}
                >
                  <i className="fa-solid fa-list-ol"></i>
                </button>

                <button
                  title={"Blockquote"}
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className={editor.isActive("blockquote") ? "is-active" : ""}
                >
                  <i className="fa-solid fa-block-quote"></i>
                </button>
                <button
                  title={"Horizontal rule"}
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                >
                  <i className="fa-solid fa-horizontal-rule"></i>
                </button>
                <button
                  title={"Hard break"}
                  onClick={() => editor.chain().focus().setHardBreak().run()}
                >
                  <i className="fa-solid fa-file-dashed-line"></i>
                </button>
              </Box>
            </HStack>
            <HStack>
              <Box
                className={"text-group"}
                bg={"#f9f9f9"}
                p={2}
                mb={2}
                borderRadius={8}
              >
                <button
                  title={"Undo"}
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                >
                  <i className="fa-solid fa-rotate-left"></i>
                </button>
                <button
                  title={"Redo"}
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                >
                  <i className="fa-solid fa-rotate-right"></i>
                </button>
              </Box>
            </HStack>
          </HStack>
        </div>
      </div>
      <Box position={"relative"} mt={4} borderRadius="md">
        <EditorContent onChange={() => console.log("hello!")} editor={editor} />

        {changed && (
          <Button
            size={"xs"}
            colorPalette={"blue"}
            position={"absolute"}
            onClick={updateContent}
            bottom={2}
            right={2}
          >
            <i className="fa-solid fa-floppy-disk"></i> Update
          </Button>
        )}
      </Box>
    </Box>
  );
};
