'use client';

import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import { TbCategoryPlus } from "react-icons/tb";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from 'next/image'; // Add this import
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  Button,
  ChakraProvider,
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
  Select,
  Spinner,
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import Sidebar from '../sidebar/sidebar';

type SubDetail = {
  title: string;
  description: string;
  imageUrl?: string;
};

type Order = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  season: string;
  hide: boolean;
  imageUrl?: string;
  author?: string;
  subDetails?: SubDetail[];
  map?: string;
  days: number;
};

type Categories = {
  name: string;
  id: string;
};

const PackageManagement = () => {
  const [packages, setPackages] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPackage, setSelectedPackage] = useState<Order | null>(null);
  const [packageToDelete, setPackageToDelete] = useState<Order | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const OrganizationID = 'packages';
        const itemsRef = collection(db, OrganizationID);
        const itemsQuery = query(itemsRef, where("id", "!=", ""));
        const querySnapshot = await getDocs(itemsQuery);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
        setPackages(data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddPackage = async (newPackage: Order) => {
    const docRef = await addDoc(collection(db, 'packages'), {
      ...newPackage,
      id: '',
    });
    await updateDoc(docRef, { id: docRef.id });
    setPackages([...packages, { ...newPackage, id: docRef.id }]);
  };

  const handleEditPackage = async (updatedPackage: Order) => {
    try {
      await updateDoc(doc(db, 'packages', updatedPackage.id), updatedPackage);
      setPackages(packages.map(pkg => pkg.id === updatedPackage.id ? updatedPackage : pkg));
      onClose();
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleDeletePackage = async (pkgId: string) => {
    try {
      await deleteDoc(doc(db, 'packages', pkgId));
      setPackages(packages.filter(pkg => pkg.id !== pkgId));
      onDeleteClose();
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const openEditModal = (pkg: Order) => {
    setSelectedPackage(pkg);
    setIsEditing(true);
    onOpen();
  };

  const openAddModal = () => {
    setSelectedPackage(null);
    setIsEditing(false);
    onOpen();
  };

  const openDeleteModal = (pkg: Order) => {
    setPackageToDelete(pkg);
    onDeleteOpen();
  };

  return (
    <ChakraProvider>
      <Flex>
        <Sidebar />
        <Box flex={1} p={8}>
          <Heading mb={6}>Manage Your Packages</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={openAddModal} mb={4}>
            Add New
          </Button>
          <Button colorScheme="blue" leftIcon={<TbCategoryPlus />} onClick={() => router.push('/superAdmin/tourcategories')} mb={4} ml={2}>
            Categories
          </Button>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Description</Th>
                <Th>Sub-Details</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {packages.map((pkg) => (
                <Tr key={pkg.id}>
                  <Td>{pkg.name}</Td>
                  <Td>{pkg.category}</Td>
                  <Td>${pkg.price}</Td>
                  <Td>{pkg.description}</Td>
                  <Td>{pkg.season}</Td>
                  <Td>
                    {pkg.subDetails?.map((subDetail, idx) => (
                      <Box key={idx}>
                        <Text fontWeight="bold">{subDetail.title}</Text>
                        <Text>{subDetail.description}</Text>
                        {subDetail.imageUrl && (
                          <Image
                            src={subDetail.imageUrl}
                            alt={`SubDetail-${idx}`}
                            width={500} // Adjust width as needed
                            height={300} // Adjust height as needed
                            layout="responsive"
                          />
                        )}
                      </Box>
                    ))}
                  </Td>
                  <Td>
                    <Button className='p-2 m-2' size="sm" leftIcon={<EditIcon />} onClick={() => openEditModal(pkg)} mr={2}>
                      Edit
                    </Button>
                    <Button className='p-2 m-2' size="sm" colorScheme="red" onClick={() => openDeleteModal(pkg)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <PackageFormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={isEditing ? handleEditPackage : handleAddPackage}
            initialData={selectedPackage}
            isEditing={isEditing}
          />
        </Box>
      </Flex>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this package?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => packageToDelete && handleDeletePackage(packageToDelete.id)}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onDeleteClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

interface PackageFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Order) => void;
  initialData: Order | null;
  isEditing: boolean;
}

const PackageFormModal = ({ isOpen, onClose, onSubmit, initialData, isEditing }: PackageFormModalProps) => {
  const [formData, setFormData] = useState<Order>({
    id: initialData?.id || '',
    name: initialData?.name || '',
    category: initialData?.category || '',
    price: initialData?.price || 0,
    description: initialData?.description || '',
    season: initialData?.season || '',
    hide: initialData?.hide || false,
    imageUrl: initialData?.imageUrl || '',
    author: initialData?.author || '',
    subDetails: initialData?.subDetails || [],
    map: initialData?.map || '',
    days: initialData?.days || 1,
  });

  const [categories, setCategories] = useState<Categories[]>([]);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        subDetails: initialData.subDetails || [],
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const querySnapshot = await getDocs(categoriesRef);
        const categoryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories from Firestore:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingImage(true);
    const storageRef = ref(storage, `packages/${Date.now()}_${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData({ ...formData, imageUrl: downloadURL });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubDetailImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingImage(true);
    const storageRef = ref(storage, `subDetails/${Date.now()}_${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const updatedSubDetails = [...formData.subDetails!];
      updatedSubDetails[index].imageUrl = downloadURL;
      setFormData({ ...formData, subDetails: updatedSubDetails });
    } catch (error) {
      console.error('Error uploading image for sub-detail:', error);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.description || !formData.map) {
      alert("Please fill out all required fields.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  const handleAddSubDetail = () => {
    setFormData({
      ...formData,
      subDetails: [...formData.subDetails!, { title: '', description: '' }],
    });
  };

  const handleUpdateSubDetail = (index: number, field: keyof SubDetail, value: string) => {
    const updatedSubDetails = [...formData.subDetails!];
    updatedSubDetails[index][field] = value;
    setFormData({ ...formData, subDetails: updatedSubDetails });
  };

  const handleRemoveSubDetail = (index: number) => {
    const updatedSubDetails = formData.subDetails!.filter((_, i) => i !== index);
    setFormData({ ...formData, subDetails: updatedSubDetails });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW="lg"  // Limit the width of the modal for better layout
        borderRadius="lg"  // Round the corners for a softer appearance
        boxShadow="lg"  // Add shadow for depth
      >
        <ModalHeader
          fontSize="xl"  // Set header font size
          fontWeight="bold"  // Make the header bold
          textAlign="center"  // Center the header text
        >
          {isEditing ? 'Edit Package' : 'Add New Package'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={6} bg="gray.50">  {/* Set padding and background color */}
          <VStack spacing={6} align="stretch">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Package Name"
              focusBorderColor="teal.500"  // Add focus color
              borderColor="gray.300"  // Light border color
              _hover={{ borderColor: 'gray.400' }}  // Border color on hover
            />
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Select Category"
              focusBorderColor="teal.500"
              borderColor="gray.300"
              _hover={{ borderColor: 'gray.400' }}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
            <p> Price </p>
            <Input
              name="price"
              value={formData.price}
              type="number"
              onChange={handleChange}
              placeholder="Price"
              focusBorderColor="teal.500"
              borderColor="gray.300"
            />
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              focusBorderColor="teal.500"
              borderColor="gray.300"
            />

            <Input
              name="season"
              value={formData.season}
              onChange={handleChange}
              placeholder="season"
              focusBorderColor="teal.500"
              borderColor="gray.300"
            />

            <Input
              name="map"
              value={formData.map}
              onChange={handleChange}
              placeholder="Map Embed URL"
              focusBorderColor="teal.500"
              borderColor="gray.300"
            />
            <p>Number of days</p>
            <Input
              name="days"
              value={formData.days}
              type="number"
              onChange={handleChange}
              placeholder="Number of Days"
              focusBorderColor="teal.500"
              borderColor="gray.300"
            />

            <Button
              colorScheme="teal"
              onClick={handleAddSubDetail}
              w="full"
              variant="outline"
              _hover={{ bg: 'teal.100' }}  // Button hover effect
            >
              Add Sub-Detail
            </Button>
            {formData.subDetails?.map((subDetail, index) => (
              <Box key={index} bg="gray.50" p={4} borderRadius="md" boxShadow="sm" mt={4}>
                <Input
                  value={subDetail.title}
                  onChange={(e) => handleUpdateSubDetail(index, 'title', e.target.value)}
                  placeholder="Sub-detail Title"
                  focusBorderColor="teal.500"
                  borderColor="gray.300"
                />
                <Input
                  value={subDetail.description}
                  onChange={(e) => handleUpdateSubDetail(index, 'description', e.target.value)}
                  placeholder="Sub-detail Description"
                  focusBorderColor="teal.500"
                  borderColor="gray.300"
                />
                <input
                  className="p-2 border border-gray-300 rounded-md"  // Custom file input style
                  type="file"
                  onChange={(e) => handleSubDetailImageUpload(e, index)}
                />
                <Button
                  colorScheme="red"
                  onClick={() => handleRemoveSubDetail(index)}
                  variant="ghost"
                  w="full"
                  mt={2}
                >
                  Delete
                </Button>
              </Box>
            ))}
            <Input
              type="file"
              onChange={handleImageUpload}
              borderColor="gray.300"
              _hover={{ borderColor: 'gray.400' }}
            />
            {loadingImage && <Spinner />}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            variant="solid"
            size="lg"
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            size="lg"
            _hover={{ bg: 'gray.100' }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PackageManagement;