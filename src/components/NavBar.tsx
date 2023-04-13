import React, { useContext } from 'react';
import { Flex, Link, Text, Icon, Stack, useDisclosure } from '@chakra-ui/react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { UserContext } from '../context/UserContext';

type NavLinkProps = { text: string };
const NavLink = ({ text }: NavLinkProps) => (
  <Link>
    <Text fontSize="xl" color={'darkblue'}>
      {text}
    </Text>
  </Link>
);

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      py={2}
      px={4}
      direction={['column', 'column', 'row']}
      justifyContent="space-between"
      bgColor="white"
      position="sticky"
      top="0"
      width="100%"
      overflow={'hidden'}
      zIndex={1}
    >
      <Flex alignItems="center" wrap="wrap">
        <Icon
          as={GiHamburgerMenu}
          onClick={isOpen ? onClose : onOpen}
          display={['inline', 'inline', 'none']}
          w="40px"
          h="40px"
          color="black"
        />
      </Flex>
      <Flex
        display={[isOpen ? 'flex' : 'none', isOpen ? 'flex' : 'none', 'flex']}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ sm: 'left', md: 'center' }}
          spacing="30px"
        >
          <RouteLink to="/home">
            <NavLink text="Domov" />
          </RouteLink>
          <RouteLink to="/eventsList">
            <NavLink text="Moje eventy" />
          </RouteLink>
          <a
            href="/"
            style={{
              color: '#000000',
              fontSize: '20px',
            }}
            onClick={async () => await logout(() => navigate('/'))}
          >
            Odhlásiť sa
          </a>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default NavBar;
