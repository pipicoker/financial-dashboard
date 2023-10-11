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
}
const SidebarData: SideItem[] = [
    {
        id: 'one',
        title: 'Overview',
        icon: BiCategory 
    },
    {
        id: 'two',
        title: 'Balances',
        icon: MdOutlineAccountBalanceWallet 
    },
    {
        id: 'three',
        title: 'Transactions',
        icon: LuArrowLeftRight 
    },
    {
        id: 'four',
        title: 'Bills',
        icon: FaFileInvoiceDollar 
    },
    {
        id: 'five',
        title: 'Expenses',
        icon: FaMoneyCheckDollar 
    },
    {
        id: 'six',
        title: 'Goals',
        icon: TbSteeringWheel 
    },
    {
        id: 'seven',
        title: 'Setting',
        icon: CiSettings 
    },
]

export default SidebarData