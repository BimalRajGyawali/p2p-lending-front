import React from 'react'
import Dashboard from './views/dashboard/Dashboard'
import Colors from './views/theme/colors/Colors'
import Typography from './views/theme/typography/Typography'
import {
  Breadcrumbs,
  Cards,
  Carousels,
  Collapses,
  Dropdowns,
  ListGroups,
  Navs,
  Paginations,
  Popovers,
  Tooltips
} from './views/base'
import Accordion from './views/base/spinners/Spinners'
import Spinners from './views/base/spinners/Spinners'
import Placeholders from './views/base/placeholders/Placeholders'
import Progress from './views/base/progress/Progress'
import Tables from './views/base/tables/Tables'
import { ButtonGroups, Buttons } from './views/buttons'
import Charts from './views/charts/Charts'
import FormControl from './views/forms/form-control/FormControl'
import Select from './views/forms/select/Select'
import ChecksRadios from './views/forms/checks-radios/ChecksRadios'
import InputGroup from './views/forms/input-group/InputGroup'
import FloatingLabels from './views/forms/floating-labels/FloatingLabels'
import Layout from './views/forms/layout/Layout'
import Validation from './views/forms/validation/Validation'
import { Brands, CoreUIIcons, Flags } from './views/icons'
import { Alerts, Badges, Modals } from './views/notifications'
import Toasts from './views/notifications/toasts/Toasts'
import Widgets from './views/widgets/Widgets'
import KycForm from './components/kyc/KycForm'
import LoanRequestPage from './components/loanRequest/LoanRequestPage'
import LendView from './components/lendingSuggestions/LendView'
import LoanSuggestionItem from './components/lendingSuggestions/LoanSuggestionItem'
import Wallet from './components/wallet/Wallet'
import MyLendings from './components/mylendings/MyLendings'
import ViewInstallments from './components/repayment/ViewInstallments'
import UnverifiedKYCList from './components/kyc/UnverifiedKYCList'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    element: ButtonGroups
  },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  {
    path: '/forms/checks-radios',
    name: 'Checks & Radios',
    element: ChecksRadios
  },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  {
    path: '/forms/floating-labels',
    name: 'Floating Labels',
    element: FloatingLabels
  },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  {
    path: '/notifications',
    name: 'Notifications',
    element: Alerts,
    exact: true
  },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },

  { path: '/kyc', name: 'Kyc', element: KycForm },
  { path: '/kyc/:email', name: 'KycAdmin', element: KycForm },

  { path: '/loanRequest', name: 'LoanRequest', element: LoanRequestPage },
  // {
  //   path: '/loanSuggestions',
  //   name: 'Loan Suggestions',
  //   element: LoanSuggestionList
  // },
  {
    path: '/lend',
    name: 'Lend',
    element: LendView
  },
  {
    path: '/singleSuggestion',
    name: 'Loan Suggestion',
    element: LoanSuggestionItem
  },
  { path: '/lenderWallet', name: 'Wallet', element: Wallet },
  { path: '/borrowerWallet', name: 'Wallet', element: Wallet },
  { path: '/lendings', name: 'My Lendings', element: MyLendings },
  {
    path: '/unverifiedKYC',
    name: 'unverified KYC',
    element: UnverifiedKYCList
  },
  { path: '/installments', name: 'Installments', element: ViewInstallments }
]

export default routes
