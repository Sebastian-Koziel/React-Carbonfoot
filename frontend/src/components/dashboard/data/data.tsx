import AnalyticsIcon from '@mui/icons-material/Analytics';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Co2Icon from '@mui/icons-material/Co2';
import InventoryIcon from '@mui/icons-material/Inventory';


export const mainNavData = {
    list: [
        {title: `Statystyki`, path:`/`, icon:<QueryStatsIcon />},
        {title: `Moje raporty`, path:`raports`, icon:<AnalyticsIcon />},
        {title: `Wskaźniki`, path: `emmisionFactors`, icon:<Co2Icon />},
        {title: `Produkty`, path: `products`, icon:<InventoryIcon />}
    ]

}

