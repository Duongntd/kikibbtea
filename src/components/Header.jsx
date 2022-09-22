import { useState, useEffect } from "react";
import { createStyles, Header, Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import { atom, useRecoilValue } from "recoil";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));
export const loginState = atom({
  key: "loginState",
  default: localStorage.getItem("loggedIn") ? true : false,
});

export function HeaderSimple({ links }) {
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(location.pathname);
  useEffect(() => {
    console.log("active tab setted");
    setActive(location.pathname);
  }, [location.pathname]);
  const { classes, cx } = useStyles();
  const isLoggedIn = useRecoilValue(loginState);
  const items = links.map((link) => {
    if (isLoggedIn) {
      if (link.label === "Login") return "";
      else
        return (
          <Link
            to={link.link}
            key={link.label}
            href={link.link}
            className={cx(classes.link, {
              [classes.linkActive]: active === link.link,
            })}
            onClick={() => {
              setActive(link.link);
            }}
          >
            {link.label}
          </Link>
        );
    } else {
      if (link.label === "Logout") return "";
      else
        return (
          <Link
            to={link.link}
            key={link.label}
            href={link.link}
            className={cx(classes.link, {
              [classes.linkActive]: active === link.link,
            })}
            onClick={() => {
              setActive(link.link);
            }}
          >
            {link.label}
          </Link>
        );
    }
  });

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <h2>Kiki Tee</h2>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
}
