/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Category, Joke } from "./interfaces";
import JokeCard from "./components/JokeCard";

const App: React.FC = () => {
  const [joke, setJoke] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (initialized) {
      getJokeRandom();
    } else {
      setInitialized(true);
    }
  }, [selectedCategory]);

  const getJokeRandom = async () => {
    try {
      if (selectedCategory) {
        const response = await axios.get<Joke>(
          `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
        );
        setJoke(response.data.value);
      } else {
        const response = await axios.get<Joke>(
          "https://api.chucknorris.io/jokes/random"
        );
        setJoke(response.data.value);
      }
    } catch (error) {
      console.error("Error to get a joke:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get<string[]>(
        "https://api.chucknorris.io/jokes/categories"
      );
      const categoryList: Category[] = response.data.map((name) => ({
        name,
      }));
      setCategories(categoryList);
    } catch (error) {
      console.error("Error to get categories:", error);
    }
  };

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
    setJoke(null);
  };

  return (
    <div className=" w-auto h-screen flex flex-col p-4   items-center bg-gray-900	 pt-32   ">
      <div className="flex flex-col w-[100%] lg:w-[50%]  border   p-6 h-[90%] lg:h-[70%]  bg-gray-800 border-gray-700    rounded-lg shadow ">
        <header className="mb-8">
          <h1 className=" text-center mb-2 text-2xl font-bold tracking-tight  text-white">Chuck Norris Jokes </h1>
        </header>
        <div className="flex flex-col">
          <button
            onClick={getJokeRandom}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Get random joke :  {selectedCategory}
          </button>

          <div className="mt-4 text-center ">
            <p className="mb-2 text-center text-sm font-bold tracking-tight  text-white ">Select a category:</p>
            <select
              onChange={(e) => handleCategorySelection(e.target.value)}
              value={selectedCategory || ""}
              className="border border-gray-300 rounded px-4 py-2 cursor-pointer"
            >
              <option value="">All the categories</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>


        {joke && <JokeCard joke={joke} /> }
      </div>
    </div>
  );
};

export default App;