import React from "react";
import CIcon from "@coreui/icons-react";

import {
  cilBriefcase,
  cilLink,
  cilChatBubble,
  cilPhone,
  cilMoney,
  cilGlobeAlt,
  cilBuilding,
  cilPuzzle,
  cilLifeRing,
  cilList,
  cilUser,
  cilPeople,
  cilFile,
  cilUserFollow,
  cilSpeedometer,
} from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: "Customers",
    to: "/customers",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Orders",
    to: "/orders",
    icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Collections",
    to: "/payment",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Licensee',
  //   to: '/Licensee',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,

  // },

  {
    component: CNavItem,
    name: "My Team",
    to: "/MyTeam",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: "Support",
    to: "/SupportEnquiry",
    icon: <CIcon icon={cilLifeRing} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Settings",
    to: "/Settings",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Enquiry Mode',
      //   to: '/Settings/EnquiryMode',
      //   icon:   <CIcon icon={cilPhone}  customClassName="nav-icon"   />

      // },

      // {
      //   component: CNavItem,
      //   name: 'Enquiry Type',
      //   to: '/Settings/EnquiryType',
      //   icon:   <CIcon icon={cilFile}  customClassName="nav-icon"   />

      // },
      // {
      //   component: CNavItem,
      //   name: 'Enquiry Source',
      //   to: '/Settings/EnquirySource',
      //   icon:  <CIcon icon={cilLink}  customClassName="nav-icon"   />

      // },
      // {
      //   component: CNavItem,
      //   name: 'Rate',
      //   to: '/payment',
      //   icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,

      // },

      // {
      //   component: CNavItem,
      //   name: 'Support Type',
      //   to: '/Settings/SupportType',
      //   icon:  <CIcon icon={cilChatBubble} customClassName="nav-icon"   />
      // },

      // {
      //   component: CNavItem,
      //   name: 'Org Type',
      //   to: '/Settings/OrgType',
      //   icon: <CIcon icon={cilBuilding}  customClassName="nav-icon"   />

      // },

      // {
      //   component: CNavItem,
      //   name: 'Org Category',
      //   to: '/Settings/OrgCategory',
      //   icon:  <CIcon icon={cilGlobeAlt} customClassName="nav-icon"   />

      // },
      {
        component: CNavItem,
        name: "Rate",
        to: "/Settings/Ratecard",
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Product Services",
        to: "/Settings/ProductServices",
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
      },

      // {
      //   component: CNavItem,
      //   name: 'User Roles',
      //   to: '/Settings/UserRoles',
      //  icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />

      // },
    ],
  },
];
export default _nav;
