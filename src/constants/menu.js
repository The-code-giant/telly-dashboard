import { adminRoot } from './defaultValues'

const data = [
  {
    id: 'Home',
    icon: 'iconsminds-air-balloon-1',
    label: 'Home',
    to: `${adminRoot}/home`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: `${adminRoot}/home`,
      },
      {
        icon: 'iconsminds-mail-inbox',
        label: 'menu.chat',
        to: `${adminRoot}/chat`,
      },
    ],
  },
  {
    id: 'calendar',
    icon: 'iconsminds-calendar-4',
    label: 'calendar.schedule',
    to: `${adminRoot}`,
    subs: [
      {
        icon: 'simple-icon-calendar',
        label: 'menu.calendar',
        to: `${adminRoot}/calendar`,
      },
      {
        icon: 'simple-icon-calendar',
        label: 'menu.availability',
        to: `${adminRoot}/availability`,
      },
    ],
  },

  // {
  //   id: 'secondmenu',
  //   icon: 'iconsminds-three-arrow-fork',
  //   label: 'menu.second-menu',
  //   to: `${adminRoot}/second-menu`,
  //   // roles: [UserRole.Admin, UserRole.Editor],
  //   subs: [
  //     {
  //       icon: 'simple-icon-paper-plane',
  //       label: 'menu.second',
  //       to: `${adminRoot}/second-menu/second`,
  //     },
  //   ],
  // },
  // {
  //   id: 'blankpage',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.blank-page',
  //   to: `${adminRoot}/blank-page`,
  // },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
]
export default data
