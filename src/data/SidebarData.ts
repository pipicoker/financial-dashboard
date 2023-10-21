 import {BiCategory} from 'react-icons/bi'
import {MdOutlineAccountBalanceWallet} from 'react-icons/md'
import {LuArrowLeftRight} from 'react-icons/lu'
import {FaFileInvoiceDollar} from 'react-icons/fa'
import {FaMoneyCheckDollar} from 'react-icons/fa6'
import {TbSteeringWheel} from 'react-icons/tb'
import {CiSettings} from 'react-icons/ci'
import { IconType } from 'react-icons/lib'

interface SideItem {
    id: string
    title: string
    icon: IconType
    path: string
}
const SidebarData: SideItem[] = [
    {
        id: 'one',
        title: 'Overview',
        icon: BiCategory ,
        path: ""
    },
    {
        id: 'two',
        title: 'Balances',
        icon: MdOutlineAccountBalanceWallet ,
        path: "/Home/Balances"
    },
    {
        id: 'three',
        title: 'Transactions',
        icon: LuArrowLeftRight ,
        path: ""
    },
    {
        id: 'four',
        title: 'Bills',
        icon: FaFileInvoiceDollar ,
        path: '/Home/Balances'
    },
    {
        id: 'five',
        title: 'Expenses',
        icon: FaMoneyCheckDollar ,
        path: ''
    },
    {
        id: 'six',
        title: 'Goals',
        icon: TbSteeringWheel ,
        path: ""
    },
    {
        id: 'seven',
        title: 'Setting',
        icon: CiSettings ,
        path: ''
    },
]

export default SidebarData