import Image from 'next/image'
import {
    MenuIcon, SearchIcon, GlobeAltIcon, UserCircleIcon, UsersIcon,
} from '@heroicons/react/solid'
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';





function Header({ placeholder }) {
    const [searchInput, setSearchInput] = useState('');
    const [numOfGuests, setNumOfGuests] = useState(1);
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const router = useRouter();


    const selectionRange = {
        startDate,
        endDate,
        key: 'selection',
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)

        console.log(endDate);
    }

    const resetInput = () => {
        setSearchInput('');
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {

                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numOfGuests,
            }
        })
        setSearchInput('');
    }

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white
            shadow-md p-5 md:px-10"

        >
            {/* Left and Logo */}
            <div className='relative flex items-center h-10 cursor-pointer my-auto'
                onClick={() => router.push('/')}
            >
                <Image
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* Middle for search */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input
                    placeholder={placeholder || "Start your search"}
                    value={searchInput} onChange={e => setSearchInput(e.target.value)}
                    className="flex-grow pl-5 bg-transparent 
                    outline-none text-gray-600 placeholder-gray-400"
                    type="text" />
                <SearchIcon
                    className="hidden md:inline-flex h-8 mx-3
                    bg-red-400 text-white rounded-full p-2 cursor-pointer"
                />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />

                <div className="flex items-center space-x-2 rounded-full border-2 p-2">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div>

            {searchInput && (
                // <h1>yooo</h1>
                <div className="flex flex-col col-span-3 md:mx-auto">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={['#FD5B61']}
                        onChange={handleSelect}
                    />

                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>

                        <UsersIcon className="h-5" />
                        <input
                            value={numOfGuests} onChange={e => setNumOfGuests(e.target.value)}
                            className="w-12 pl-2 text-lg outline-none text-red-400" type="number" min="0" max="6" />
                    </div>
                    <div className="flex ">
                        <button onClick={resetInput} className="flex-grow text-gray-400 py-3 hover:bg-red-400 hover:text-white rounded-3xl">Cancel </button>
                        <button onClick={search} className="flex-grow py-3 text-gray-400 hover:bg-red-400 hover:text-white rounded-3xl">Search</button>
                    </div>
                </div>

            )

            }
        </header>
    )
}

export default Header
