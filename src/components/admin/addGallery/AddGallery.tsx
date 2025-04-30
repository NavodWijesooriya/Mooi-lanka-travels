'use client';

import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TbCategoryPlus } from "react-icons/tb";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Box,
  Heading,
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
  Spinner,
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import Sidebar from '../sidebar/sidebar';

type Order = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
};

const PackageManagement = () => {
  const [packages, setPackages] = useState < Order[] > ([]);
  const [loading, setLoading] = useState < boolean > (true);
  const [selectedPackage, setSelectedPackage] = useState < Order | null > (null);
  const [imageFile, setImageFile] = useState < File | null > (null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState < boolean > (false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const OrganizationID = 'jagath-gallery';
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
    let imageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      const uploadResult = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(uploadResult.ref);
    }

    const docRef = await addDoc(collection(db, 'jagath-gallery'), {
      ...newPackage,
      id: '',
      imageUrl: imageUrl || "",
    });

    await updateDoc(docRef, { id: docRef.id });

    setPackages([...packages, { ...newPackage, id: docRef.id, imageUrl }]);
    onClose();
  };

  const handleEditPackage = async (updatedPackage: Order) => {
    let imageUrl = updatedPackage.imageUrl;
    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      const uploadResult = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(uploadResult.ref);
    }

    try {
      await updateDoc(doc(db, 'jagath-gallery', updatedPackage.id), {
        ...updatedPackage,
        imageUrl,
      });
      setPackages(packages.map(pkg => pkg.id === updatedPackage.id ? { ...updatedPackage, imageUrl } : pkg));
      onClose();
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleDeletePackage = async (pkgId: string) => {
    try {
      await deleteDoc(doc(db, 'jagath-gallery', pkgId));
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

  return (
    <ChakraProvider>
      <Flex>
        <Sidebar />
        <Box flex={1} p={8}>
          <Heading mb={6}>Manage Your Gallery</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={openAddModal} mb={4}>
            Add New
          </Button>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Image</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {packages.map((pkg) => (
                <Tr key={pkg.id}>
                  <Td>{pkg.name}</Td>
                  <Td>{pkg.description}</Td>
                  <Td>
                    {pkg.imageUrl && <Image src={pkg.imageUrl} alt="Package" width={100} height={100} />}
                  </Td>
                  <Td>
                    <Button size="sm" leftIcon={<EditIcon />} onClick={() => openEditModal(pkg)} mr={2}>
                      Edit
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDeletePackage(pkg.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Modal for Adding/Editing Packages */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{isEditing ? 'Edit Package' : 'Add New Gallery'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4}>
                  <Input
                    placeholder="Gallery Name"
                    value={selectedPackage?.name || ''}
                    onChange={(e) => setSelectedPackage({ ...selectedPackage, name: e.target.value } as Order)}
                  />
                  <Input
                    placeholder="Gallery Description"
                    value={selectedPackage?.description || ''}
                    onChange={(e) => setSelectedPackage({ ...selectedPackage, description: e.target.value } as Order)}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                  />
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => (isEditing ? handleEditPackage(selectedPackage as Order) : handleAddPackage(selectedPackage as Order))}>
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default PackageManagement;
