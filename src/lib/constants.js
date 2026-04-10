// Rather than hard-coding or having it in single areas
// We put everything here, so It's easy to edit (also means if we add i18n, I don't wanna kill myself as much!)
export const APP_CONFIG = {
  name: 'Softboy Sanctuary',
  discordInvite: 'https://discord.gg/softboy',
  githubUrl: 'https://github.com/softboysanctuary/frontend',
  footerCopyright: 'Softboy Sanctuary',
  authEndpoint: 'https://api.softboy.site/auth/discord',
  // TODO: Add other endpoints here...
};

export const STRINGS = {
  hero: {
    title: 'Softboy',
    titleGradient: 'Sanctuary',
    description:
      "Softboy Sanctuary is an LGBT+ NSFW/18+ community, whether you are a femboy, gay, trans, or anything else! You're welcome here.",
  },
  nav: {
    joinBtn: 'Join Us',
    logoutBtn: 'Logout',
  },
};

export const FEATURES = [
  {
    title: '18+ Only',
    desc: 'Strictly adults, no exceptions!',
    icon: 'bx-shield-quarter',
  },
  {
    title: 'Regular Events',
    desc: 'We host regular events and giveaways :p',
    icon: 'bx-calendar-event',
  },
  {
    title: 'Community First',
    desc: 'The focus is the community, like it should be.',
    icon: 'bx-group',
  },
  {
    title: 'No Drama',
    desc: 'Zero tolerance for toxicity.',
    icon: 'bx-check-shield',
  },
];
