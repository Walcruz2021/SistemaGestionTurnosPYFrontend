
import { StatisticsCard } from "./StatisticsCard";
import {StatisticsCardsData} from "./StatisticsCardsData"

const CardsItems1 = () => {
    return (
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {StatisticsCardsData.map(({ icon, title, footer, ...rest }) => (
                <StatisticsCard
                    key={title}
                    {...rest}
                    title={title}
                    // icon={React.createElement(icon, {
                    //     className: "w-6 h-6 text-white",
                    // })}
                    // footer={
                    //     <Typography className="font-normal text-blue-gray-600">
                    //         <strong className={footer.color}>{footer.value}</strong>
                    //         &nbsp;{footer.label}
                    //     </Typography>
                    // }
                />
            ))}
        </div>
    )
}

export default CardsItems1