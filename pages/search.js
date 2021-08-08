import Header from "../components/Header"
import Footer from "../components/Footer"
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import getCenter from "geolib/es/getCenter"

function search({ searchResults }) {
    const router = useRouter();
    const { location, startDate, endDate, numOfGuests } = router.query;

    const formattedStartDate = format(new Date(startDate), 'dd MMMM yy')
    const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
    const range = `${formattedStartDate} - ${formattedEndDate}`

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${numOfGuests}G`} />

            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-gray-600 text-xs">300+ Stays - {range} -  for {numOfGuests} </p>

                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden md:inline-flex space-x-3 mb-5 text-gray-800 whitespace-nowrap">
                        <p className="button">Free Cancellation</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More Filters</p>
                    </div>
                    <hr />
                    {searchResults.map(({ img, location, title, description,
                        star, price, total }) => (
                        <InfoCard
                            key={img}
                            img={img}
                            location={location}
                            title={title}
                            description={description}
                            star={star}
                            price={price}
                            total={total}
                        />
                    ))}
                </section>

                <section className="hidden lg:inline-flex lg:min-w-[600px]">
                    <Map searchResults={searchResults} />
                </section>
            </main >
            <Footer />

        </div >
    )
}

export default search

export async function getServerSideProps() {
    const searchResults = await fetch('https://links.papareact.com/isz')
        .then(res => res.json());


    console.log(searchResults)
    return {
        props: {
            searchResults
        }
    }
}