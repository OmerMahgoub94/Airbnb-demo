import Image from 'next/image'
function LargeCard({ img, title, description, buttonText }) {
    return (
        <section className="relative">
            <div className="relative h-96 min-width[300px]">
                <Image className="rounded-2xl" src={img} layout="fill" objectFit="cover" />
            </div>

            <div
                className="absolute top-12 left-12"
            >
                <h3 className="text-4xl  w-64">{title}</h3>
                <h3 className="my-5 text-xl">{description}</h3>

                <button className="text-sm text-white bg-gray-900 px-4 py-2 rounded-2xl mt-2">{buttonText}</button>
            </div>

        </section>
    )
}

export default LargeCard
