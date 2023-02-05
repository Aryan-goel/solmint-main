import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [promptValue, setPromptValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setPromptValue(e.target.prompt.value);

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();

      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      // console.log({ prediction });
      setPrediction(prediction);
      setIsGenerating(false);
    }
    const pred_res = prediction.output[prediction.output.length - 1];
    // console.log(pred_res)
  };

  const reset = () => {
    setPrediction(null);
    setError(null);
    setPromptValue("");
  };

  return (
    <div className="">
      <Head>
        <title>solmint</title>
      </Head>
      <Header />
      <div>
        {!prediction && (
          <div className="grid mt-64 place-items-center">
            <div className="text-6xl p-2 font-extrabold text-gray-700">
              type your mind out{" "}
              <a className="text-yellow-300 textoutline">.</a>
            </div>
            <form
              className="py-5 font-space animate-in items-center fade-in duration-700"
              onSubmit={handleSubmit}
            >
              <div className="flex">
                <div className="relative m-2">
                  <div className="absolute inset-0 mr-1 bg-pink-400 ring-1 ring-black"></div>
                  <input
                    type="text"
                    name="prompt"
                    placeholder="enter a prompt"
                    className="relative -inset-x-2 mr-1 bg-pink-50/100 hover:bg-pink-50/100 -inset-y-2 focus:outline-none w-[250px] xl:w-[630px] lg:w-[630px] md:w-[350px] flex items-center justify-center border-4 border-transparent px-2 py-1 font-light text-black ring-1 ring-black"
                  />
                </div>
                <div className="relative m-2">
                  <div className="absolute inset-0 mr-1 bg-yellow-300 ring-1 ring-black"></div>

                  <button
                    className="relative -inset-x-2 -inset-y-2 hover:-inset-x-1.5 hover:-inset-y-1.5 bg-yellow-50/100 flex items-center justify-center border-4 border-transparent px-2 py-1 font-light text-gray-700 ring-1 ring-black"
                    type="submit"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {error && alert(error)}

      {prediction && isGenerating && (
        <div className="flex justify-center text-center text-5xl text-gray-700 mt-64">
          <p>{prediction.status}</p>
        </div>
      )}

      {prediction && (
        <div>
          {prediction.output && (
            <div className="flex md:flex-row xl:flex-row flex-col lg:flex-row justify-center mt-8 lg:mt-32 xl:mt-32 md:mt-32">
              <Image
                className="rounded-lg border border-gray-300 p-2.5"
                alt="output image"
                src={prediction.output[prediction.output.length - 1]}
                width={window.innerWidth <= 500 ? 400 : 500}
                height={window.innerWidth <= 500 ? 400 : 500}
              />
              <div className="flex flex-col">
                <span className="ml-8 text-gray-800 text-2xl mt-2 italic font-serif font-extralight ">
                  &quot;{promptValue}&quot;
                </span>
                <div className="flex flex-col mt-8 justify-center">
                  <button
                    className="p-4 border hover:bg-gray-900/5 border-black ml-8 mr-8 mt-4"
                    // onClick={mintNFT}
                  >
                    Mint NFT
                  </button>

                  <button
                    className="p-4 border hover:bg-gray-900/5 border-black ml-8 mr-8 mt-4"
                    onClick={reset}
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
