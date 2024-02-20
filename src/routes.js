import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import("./views/base/spinners/Spinners"));
// const Tables = React.lazy(() => import('./views/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))
// Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const SupportType = React.lazy(() =>
  import("./page/Settings/SupportType/Index")
);
const EnquirySource = React.lazy(() =>
  import("./page/Settings/EnquirySource/Index")
);
const EnquiryMode = React.lazy(() => import("./page/Settings/EnquiryMode"));
const OrgType = React.lazy(() => import("./page/Settings/OrgType/Index"));
const OrgCategory = React.lazy(() =>
  import("./page/Settings/OrgCategory/Index")
);
const ProductServices = React.lazy(() =>
  import("./page/Settings/ProductServices/Index")
);
const EnquiryType = React.lazy(() =>
  import("./page/Settings/EnquiryType/Index")
);
const UserRoles = React.lazy(() => import("./page/Settings/UserRole/index"));
const EnquiryManagement = React.lazy(() =>
  import("./page/EnquiryMangement/Index")
);
const FollowUp = React.lazy(() => import("./page/Orders/Index"));
// const Licensee = React.lazy(() => import('./page/Licensee/index'))
const MyTeam = React.lazy(() => import("./page/MyTeam/index"));
const Payment = React.lazy(() => import("./page/Payment/index"));
const SupportEnquiry = React.lazy(() => import("./page/Support/Index"));
const Ratecard = React.lazy(() => import("./page/Settings/Ratecard/index"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  { path: "/base/spinners", name: "Spinners", element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // {
  //   path: '/buttons/button-groups',
  //   name: 'Button Groups',
  //   element: ButtonGroups,
  // },

  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // {
  //   path: '/forms/checks-radios',
  //   name: 'Checks & Radios',
  //   element: ChecksRadios,
  // },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // {
  //   path: '/forms/floating-labels',
  //   name: 'Floating Labels',
  //   element: FloatingLabels,
  // },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   element: Alerts,
  //   exact: true,
  // },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },

  {
    path: "/customers",
    name: "Enquiries",
    element: EnquiryManagement,
    exact: true,
  },

  { path: "/orders", name: "FollowUp", element: FollowUp, exact: true },
  // { path: '/Licensee', name: 'Licensee', element: Licensee, exact: true },

  { path: "/MyTeam", name: "My Team", element: MyTeam, exact: true },
  { path: "/payment", name: "Payment", element: Payment, exact: true },
  {
    path: "/SupportEnquiry",
    name: "Suppor",
    element: SupportEnquiry,
    exact: true,
  },

  { path: "/Settings", name: "Settings", element: EnquirySource, exact: true },
  {
    path: "/Settings/EnquirySource",
    name: "EnquirySource",
    element: EnquirySource,
  },
  {
    path: "/Settings/EnquirySource",
    name: " EnquirySource",
    element: EnquirySource,
  },
  { path: "/Settings", name: "Settings", element: EnquiryMode, exact: true },
  { path: "/Settings/EnquiryMode", name: "EnquiryMode", element: EnquiryMode },

  {
    path: "/Settings/EnquiryType",
    name: " EnquiryType",
    element: EnquiryType,
  },
  {
    path: "/Settings/SupportType",
    name: " SupportType",
    element: SupportType,
  },
  {
    path: "/Settings/EnquiryMode",
    name: " EnquiryMode",
    element: EnquiryMode,
  },
  {
    path: "/Settings/OrgType",
    name: "OrgType ",
    element: OrgType,
  },
  {
    path: "/Settings/OrgCategory",
    name: "OrgCategory ",
    element: OrgCategory,
  },
  {
    path: "/Settings/ProductServices",
    name: "ProductServices ",
    element: ProductServices,
  },
  {
    path: "/Settings/UserRoles",
    name: "User Roles ",
    element: UserRoles,
  },
  {
    path: "/Settings/Ratecard",
    name: "Rate ",
    element: Ratecard,
  },
];

export default routes;
