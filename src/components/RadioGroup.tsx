"use client";

import { HStack, RadioGroup } from "@chakra-ui/react";

export interface RadioGroupItem {
  label: string;
  value: string;
}

export const RadioGroupComponent = ({ items }: { items: RadioGroupItem[] }) => {
  return (
    <RadioGroup.Root defaultValue="1">
      <HStack gap="6">
        {items.map((item: RadioGroupItem) => (
          <RadioGroup.Item key={item.value} value={item.value}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </HStack>
    </RadioGroup.Root>
  );
};
