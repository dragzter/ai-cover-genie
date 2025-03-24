import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0/client";

export const ProfileClient = () => {
  const { user } = useUser();

  return (
    <Stack gap="8">
      {user && (
        <HStack key={user.email} gap="4">
          <Avatar.Root>
            <Avatar.Fallback name={user.name as string} />
            <Avatar.Image src={user.picture as string} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="medium">{user.name}</Text>
            <Text color="fg.muted" textStyle="sm">
              {user.email}
            </Text>
          </Stack>
        </HStack>
      )}
    </Stack>
  );
};
