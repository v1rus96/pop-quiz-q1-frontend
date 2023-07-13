import { createStyles, Navbar, Group, Code, getStylesRef, rem, Avatar, UnstyledButton, Text } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconReceipt2,
  IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import {logoutUser} from "../../services/auth";
import useUser from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [
  { link: '/order', label: 'Order', icon: IconReceipt2 },
  { link: '/ekyc', label: 'eKYC', icon: IconFingerprint },
  { link: '/approval', label: 'Approve Orders', icon: IconBellRinging },
];

export function Nav() {
  const { classes, cx } = useStyles();
  const session = useUser() as any;
  const history = useHistory();
  const location = useLocation();

async function handleSignOut() {
    try {
      await logoutUser();
    } catch (error: any) {
        alert(error.message);
        }
        
  }

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: location.pathname === item.link })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        history.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));


  return (
    <Navbar  width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <MantineLogo size={28} />
          <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
      <UnstyledButton>
      <Group>
        <Avatar size={40} color="blue">AV</Avatar>
        <div>
          <Text>{session?.session?.user?.role}</Text>
          <Text size="xs" color="dimmed">{session?.session?.user?.email}</Text>
        </div>
      </Group>
    </UnstyledButton>

        <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span onClick={handleSignOut}>Sign Out</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}