'use client';

import React, { useState } from 'react';
import {
  VStack,
  Heading,
  Button,
  Icon,
  Box,
  useColorModeValue,
  Flex,
  Text,
  Tooltip,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import {
  FiPackage,
  FiList,
  FiMenu,
  FiChevronRight,
  FiImage,
  FiMessageSquare,
  FiFileText,
} from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

type NavItemProps = {
  icon: IconType;
  label: string;
  onClick: () => void;
  isOpen: boolean;
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const sidebarBg = useColorModeValue('white', 'gray.800');
  const buttonHoverBg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  const sidebarWidth = isOpen ? '240px' : '70px';

  const NavItem: React.FC<NavItemProps> = ({ icon, label, onClick }) => (
    <Tooltip label={label} placement="right" isDisabled={isOpen}>
      <Button
        aria-label={label}
        leftIcon={<Icon as={icon} color={iconColor} boxSize={5} />}
        justifyContent={isOpen ? 'flex-start' : 'center'}
        width="100%"
        variant="ghost"
        onClick={onClick}
        py={6}
        borderRadius="0"
        _hover={{ bg: buttonHoverBg }}
        transition="all 0.3s"
      >
        {isOpen && <Text fontSize="md" fontWeight="medium">{label}</Text>}
      </Button>
    </Tooltip>
  );

  return (
    <Box position="relative" display="flex">
      <Box
        as="nav"
        bg={sidebarBg}
        height="100vh"
        width={sidebarWidth}
        position="fixed"
        top="0"
        left="0"
        transition="all 0.4s ease-in-out"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        zIndex="sticky"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        {/* Sidebar Header */}
        <Flex justify="space-between" align="center" p={4} height="80px">
          <Heading size="md" color={textColor} opacity={isOpen ? 1 : 0} transition="opacity 0.4s">
            Dashboard
          </Heading>
          <Button
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            color={iconColor}
            _hover={{ bg: buttonHoverBg }}
          >
            <Icon as={isOpen ? IoCloseSharp : FiMenu} boxSize={6} />
          </Button>
        </Flex>

        <Divider mb={4} />

        {/* Navigation Items */}
        <VStack spacing={0} align="stretch" flex="1">
          <NavItem icon={FiList} label="Bookings" onClick={() => router.push('/superAdmin')} isOpen={isOpen} />
          <NavItem icon={FiPackage} label="Packages" onClick={() => router.push('/superAdmin/addPackages')} isOpen={isOpen} />
          <NavItem icon={FiImage} label="Gallery" onClick={() => router.push('/superAdmin/addGallery')} isOpen={isOpen} />
          <NavItem icon={FiMessageSquare} label="Review" onClick={() => router.push('/superAdmin/viewReview')} isOpen={isOpen} />
          <NavItem icon={FiFileText} label="Blog" onClick={() => router.push('/admin/addBlog')} isOpen={isOpen} />
        </VStack>

        <Divider mt={4} />

        {/* Logout Button - Positioned at the Bottom */}
        <Box p={16}>
          <Button
            bg="red.500"
            color="white"
            fontSize="md"
            width="100%"
            py={3}
            rounded="lg"
            _hover={{ bg: 'red.200' }}
            transition="background 0.3s"
            onClick={() => {
              signOut(auth)
                .then(() => {
                  sessionStorage.removeItem('admin');
                  router.push('/auth/login');
                })
                .catch((error) => {
                  console.error('Error during sign out:', error);
                });
            }}
          >
            Log out
          </Button>
        </Box>
      </Box>

      {/* Sidebar Toggle Button when Collapsed */}
      {!isOpen && (
        <IconButton
          aria-label="Open sidebar"
          icon={<FiChevronRight />}
          position="fixed"
          left={0}
          top={2}
          zIndex="sticky"
          onClick={() => setIsOpen(true)}
          variant="solid"
          colorScheme="blue"
          size="sm"
          borderLeftRadius={0}
          boxShadow="md"
        />
      )}

      {/* Main Content Area */}
      <Box
        as="main"
        ml={sidebarWidth}
        transition="margin-left 0.4s ease-in-out"
        width={`calc(100% - ${sidebarWidth})`}
        p={8}
      >
        {/* Main content goes here */}
      </Box>
    </Box>
  );
};

export default Sidebar;