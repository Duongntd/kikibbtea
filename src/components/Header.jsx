import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
import { Link } from "react-router-dom";
import { atom, useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    display: "flex",
    justifyContent: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const mockdata = [
  {
    icon: "fa-solid fa-user",
    title: "Personal info",
    link: "account/profile",
  },
  {
    icon: "fa-solid fa-clock-rotate-left",
    title: "History",
    link: "account/history",
  },
  {
    icon: "fa-solid fa-gift",
    title: "My Rewards",
    link: "account/rewards",
  },
  {
    icon: "fa-solid fa-gear",
    title: "Settings",
    link: "account/settings",
  },
];
export const loginState = atom({
  key: "loginState",
  default: localStorage.getItem("loggedIn") ? true : false,
});

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const isLoggedIn = useRecoilValue(loginState);
  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Link to={item.link}>
        <Group noWrap align="center">
          <ThemeIcon size={34} variant="default" radius="md">
            <FontAwesomeIcon icon={item.icon} />
          </ThemeIcon>
          <div>
            <Text size="sm" weight={500}>
              {item.title}
            </Text>
          </div>
        </Group>
      </Link>
    </UnstyledButton>
  ));

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <MantineLogo size={30} />

          <Group
            sx={{ height: "100%" }}
            spacing={10}
            className={classes.hiddenMobile}
          >
            <Link to="/">
              <UnstyledButton>Home</UnstyledButton>
            </Link>

            <Link to="/order">
              <UnstyledButton>Order</UnstyledButton>
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            {!isLoggedIn ? (
              <div>
                <Link to="login">
                  <Button variant="outline" color="teal">
                    Log in
                  </Button>
                </Link>
                <Link to="signup">
                  <Button variant="white" color="dark">
                    Join us
                  </Button>
                </Link>
              </div>
            ) : (
              <HoverCard
                width={220}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Account
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={theme.fn.primaryColor()}
                    />
                  </Center>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <Group position="apart" px="md">
                    <Text weight={500}>Account</Text>
                    <Link to="/account" className="overview-link">
                      Overview
                    </Link>
                  </Group>

                  <Divider
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                  />

                  <SimpleGrid cols={1} spacing={0}>
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <Link to="logout">
                      <Button variant="default">
                        <span className="p-5"></span>Log out
                        <span className="p-5"></span>
                      </Button>
                    </Link>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link to="/" className={classes.link}>
            Home
          </Link>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Link to="/" className={classes.link}>
            Learn
          </Link>
          <Link to="/" className={classes.link}>
            Academy
          </Link>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
