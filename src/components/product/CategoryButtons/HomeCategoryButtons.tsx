'use client'

import React from "react";
import { Grid, GridItem, Button, Icon, useMediaQuery } from "@chakra-ui/react";
import { FaMountain, FaLandmark, FaPaw, FaCity, FaWineGlass, FaUmbrellaBeach } from "react-icons/fa";
import Title from "@/components/Title/Title";

const HomeCategoryButtons = () => {
  const [isDesktop] = useMediaQuery("(min-width: 48em)"); // 48em is roughly 768px

  return (
<>
    <Title title="Packages" />
    </>
  );
};

export default HomeCategoryButtons;