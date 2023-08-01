
interface Props {
    joke: string;
}

const JokeCard = ({ joke }: Props) => (
    <div className="max-w-md mx-auto   border   p-4 my-4 mt-14  text-white  bg-gray-800 border-gray-700    rounded-lg shadow  ">
        <p className="text-xl">{joke}</p>
    </div>
);

export default JokeCard