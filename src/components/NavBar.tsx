import React, { useContext } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  StackDivider,
  useColorModeValue,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';

type NavLinkProps = { text: string };
const NavLink = ({ text }: NavLinkProps) => (
  <Link>
    <Text fontSize="xl">{text}</Text>
  </Link>
);

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  return (
    <>
      <Box bg={'gray.100'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack
            spacing={8}
            alignItems={'center'}
            divider={<StackDivider />}
            as="nav"
          >
            <RouteLink to="/home">
              <NavLink text="Domov" />
            </RouteLink>
            <RouteLink to="/eventsList">
              <NavLink text="Moje eventy" />
            </RouteLink>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                // as={Button}
                // rounded={'full'}
                // variant={'link'}
                // cursor={'pointer'}
                // minW={0}
                as={IconButton}
                color="blue.400"
                aria-label="Options"
                icon={<FaBars />}
                variant="outline"
                w="50px"
                h="50px"
                me="6px"
              ></MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/noheader/createEvent')}>
                  Pridať nový event
                </MenuItem>
                <MenuItem></MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={async () =>
                    await logout(() => navigate('/noheader'))
                  }
                >
                  Odhlásiť sa
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
