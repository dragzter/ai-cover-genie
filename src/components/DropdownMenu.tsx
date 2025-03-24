import { Box, Button, Menu, Portal } from "@chakra-ui/react";

interface DropdownMenuProps {
  children: React.ReactNode;
  title: string;
  links: { title: string; href: string }[];
}

export const DropdownMenu = ({ children, title, links }: DropdownMenuProps) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Box style={{ cursor: "pointer" }}>{children}</Box>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {links.map((link) => (
              <Menu.Item
                _hover={{ bg: "blue.500", color: "white" }}
                key={link.href}
                asChild
                value={link.title}
              >
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.title}
                </a>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
