'use client';

import React, { useState, useEffect } from 'react';
import { getDocs, collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const CategoryCreation = () => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const querySnapshot = await getDocs(categoriesRef);
        const categoryList = querySnapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories from Firestore:", error);
      }
    };

    fetchCategories();
  }, []);

  // Add new category to Firebase
  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const categoriesRef = collection(db, 'categories');
        const docRef = await addDoc(categoriesRef, { name: newCategory });
        setCategories([...categories, { id: docRef.id, name: newCategory }]);
        setNewCategory(''); // Clear input field
        onClose(); // Close modal after adding
      } catch (error) {
        console.error("Error adding category to Firestore:", error);
      }
    } else {
      console.log('Category name cannot be empty');
    }
  };

  // Edit category in Firebase
  const handleEditCategory = async () => {
    if (editingCategory && editingCategory.name.trim()) {
      try {
        const categoryRef = doc(db, 'categories', editingCategory.id);
        await updateDoc(categoryRef, { name: editingCategory.name });
        setCategories(categories.map((category) =>
          category.id === editingCategory.id ? { ...category, name: editingCategory.name } : category
        ));
        setEditingCategory(null);
        onClose();
      } catch (error) {
        console.error("Error updating category in Firestore:", error);
      }
    }
  };

  // Delete category from Firebase
  const handleDeleteCategory = async (id: string) => {
    try {
      const categoryRef = doc(db, 'categories', id);
      await deleteDoc(categoryRef);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category from Firestore:", error);
    }
  };

  // Open edit modal
  const openEditModal = (category: { id: string; name: string }) => {
    setEditingCategory(category);
    onOpen();
  };

  return (
    <Box p={8}>
      <Heading mb={6}>Manage Categories</Heading>
      <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen} mb={4}>
        Add New Category
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Category Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.id}>
              <Td>{category.name}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="yellow"
                  onClick={() => openEditModal(category)}
                  aria-label="Edit category"
                  mr={2}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDeleteCategory(category.id)}
                  aria-label="Delete category"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add or Edit Category Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingCategory ? 'Edit Category' : 'Add New Category'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Category Name"
                value={editingCategory ? editingCategory.name : newCategory}
                onChange={(e) => {
                  if (editingCategory) {
                    setEditingCategory({ ...editingCategory, name: e.target.value });
                  } else {
                    setNewCategory(e.target.value);
                  }
                }}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={editingCategory ? handleEditCategory : handleAddCategory}>
              {editingCategory ? 'Save Changes' : 'Add Category'}
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CategoryCreation;
