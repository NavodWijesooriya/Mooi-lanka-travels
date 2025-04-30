'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
  ChakraProvider,
  Input,
  VStack,
  Collapse,
  IconButton,
  Textarea,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import Sidebar from '../sidebar/sidebar';
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Define a type for the blog post
interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  publishedAt: string;
}

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    title: '',
    content: '',
    author: '',
    category: '',
    publishedAt: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<BlogPost, 'id'>) }));
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateBlog = async () => {
    if (isEditing) {
      await updateDoc(doc(db, 'blogs', formData.id), formData as { [x: string]: any });
      setBlogs(blogs.map(blog => (blog.id === formData.id ? formData : blog)));
    } else {
      const docRef = await addDoc(collection(db, 'blogs'), { ...formData, id: '' });
      await updateDoc(docRef, { id: docRef.id });
      setBlogs([...blogs, { ...formData, id: docRef.id }]);
    }
    resetForm();
  };

  const handleEdit = (blog: BlogPost) => {
    setFormData(blog);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'blogs', id));
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const resetForm = () => {
    setFormData({ id: '', title: '', content: '', author: '', category: '', publishedAt: '' });
    setIsEditing(false);
    setIsFormOpen(false);
  };

  return (
    <ChakraProvider>
      <Flex>
        <Sidebar />
        <Box flex={1} p={8}>
          <Heading mb={6}>Manage Your Blog Posts</Heading>

          {/* Toggle Add/Edit Form */}
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => setIsFormOpen(!isFormOpen)} mb={4}>
            {isFormOpen ? 'Close' : isEditing ? 'Edit Blog' : 'Add New Blog'}
          </Button>

          <Collapse in={isFormOpen} animateOpacity>
            <Box p={4} bg="gray.100" rounded="md" mb={4}>
              <VStack spacing={3} align="stretch">
                <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                <Input name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
                <Input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
                <Input name="publishedAt" type="date" placeholder="Published Date" value={formData.publishedAt} onChange={handleChange} />
                <Textarea
                  name="content"
                  placeholder="Content"
                  value={formData.content}
                  onChange={handleChange}
                  size="md"
                  minH="150px"
                />

                <Flex gap={2}>
                  <Button leftIcon={<CheckIcon />} colorScheme="green" onClick={handleAddOrUpdateBlog}>
                    {isEditing ? 'Update' : 'Add'}
                  </Button>
                  {isEditing && (
                    <Button leftIcon={<CloseIcon />} colorScheme="gray" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </Flex>
              </VStack>
            </Box>
          </Collapse>

          {/* Blog Table */}
          <Table>
            <Thead bg="gray.200">
              <Tr>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th>Category</Th>
                <Th>Published Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blogs.map(blog => (
                <Tr key={blog.id}>
                  <Td>{blog.title}</Td>
                  <Td>{blog.author}</Td>
                  <Td>{blog.category}</Td>
                  <Td>{blog.publishedAt}</Td>
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      colorScheme="yellow"
                      onClick={() => handleEdit(blog)}
                      mr={2}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(blog.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default BlogManagement;
