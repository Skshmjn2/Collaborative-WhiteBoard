import Image from "next/image";

export const EmptyFavorites = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/favorite.svg" alt="Empty" height={140} width={140}/>
            <h3 className="text-2xl mt-6">
                No Favorite boards.
            </h3>
        </div>
    );
};
