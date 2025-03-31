import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import { Node, mergeAttributes } from "@tiptap/core";

export const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => ({ class: attributes.class }),
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => ({ style: attributes.style }),
      },
    };
  },
});

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => ({ class: attributes.class }),
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => ({ style: attributes.style }),
      },
    };
  },
});

export const CustomListItem = ListItem.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => ({ class: attributes.class }),
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => ({ style: attributes.style }),
      },
    };
  },
});

export const CustomBulletList = BulletList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => ({ class: attributes.class }),
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => ({ style: attributes.style }),
      },
    };
  },
});

export const Div = Node.create({
  name: "div",
  group: "block",
  content: "block*",
  defining: true,

  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => ({ class: attributes.class }),
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => ({ style: attributes.style }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },
});
