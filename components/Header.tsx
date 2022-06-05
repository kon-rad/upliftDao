import {
    Text,
    Image,
    Button,
    Flex,
    LinkBox,
    Spacer,
    Box,
    useMediaQuery,
  } from "@chakra-ui/react";
  import NextLink from "next/link";
  import ConnectWallet from "./ConnectWallet";

  const Header = () => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
  
    return (
      <Flex as="header" p={4} alignItems="center" className="header-container">
        <LinkBox cursor="pointer">
          <NextLink href="/" passHref={true}>
            <Flex align="center">
              {/* <Image
                borderRadius="12px"
                mr="4"
                src="/images/logos/logo.png"
                width="40px"
                height="40px"
              /> */}
              {isMobile ? (
                ""
              ) : (
                <Text color={"white"} fontWeight="bold" fontSize="2xl" >
                  UpliftDAO
                </Text>
              )}
            </Flex>
          </NextLink>
        </LinkBox>
        <Spacer />
          <NextLink href="/mint" passHref={true}>
            <Flex align="center">
            <button  className="p-2 mr-4 text-xs font-bold text-right uppercase bg-android-green border-4 border-black pxl-lg">
                mint
            </button>
            </Flex>
          </NextLink>
        <Box>
          <ConnectWallet />
        </Box>
      </Flex>
    );
  };
  
  export default Header;
  