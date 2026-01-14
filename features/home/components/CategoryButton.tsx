import React, { memo } from "react";
import { TouchableOpacity, Text } from "react-native";


interface Category {
  slug: string;
  name: string;
}


interface CategoryButtonProps {
  item: Category;
  category: string; 
  onSelect: (slug: string) => void;
}


const CategoryButton: React.FC<CategoryButtonProps> = memo(({ item, category, onSelect }) => {
  const isSelected = category === item.slug;

  return (
    <TouchableOpacity
      onPress={() => onSelect(item.slug)}
      className={`flex ${isSelected ? "bg-red-400" : "bg-gray-200"} p-2 mx-2 rounded-xl justify-center items-center`}
    >
      <Text className={`${isSelected ? "text-white" : "text-gray-500"} font-bold`}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
});

export default CategoryButton;
