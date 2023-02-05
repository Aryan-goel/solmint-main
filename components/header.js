import Link from "next/link";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log("Phantom Wallet is installed");
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    } else {
      console.log("Phantom Wallet is not installed");
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const disconnectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.disconnect();
      //   console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress("");
    }
  };

  const renderNotConnectedContainer = () => (
    <div>
      <div className="hidden lg:flex md:flex xl:flex ml-12 space-x-4">
        <div className="relative mt-2">
          <div className="absolute inset-0 bg-green-300 ring-1 ring-black"></div>
          <button
            onClick={connectWallet}
            className="relative font-space hover:bg-yellow-50 -inset-x-2 -inset-y-2 hover:-inset-x-1.5 hover:-inset-y-1.5 bg-[#F5FFFB] flex items-center justify-center border-4 border-transparent px-2 py-1 shadow-sm font-light text-black ring-1 ring-black"
          >
            Connect Wallet{" "}
            <MdOutlineAccountBalanceWallet className="ml-2 text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex lg:hidden md:hidden xl:hidden ml-12 space-x-4">
        <div className="relative mt-2">
          <div className="absolute inset-0 bg-green-300 ring-1 ring-black"></div>

          <button
            onClick={connectWallet}
            className="relative -inset-x-2 -inset-y-2 hover:-inset-x-1.5 hover:-inset-y-1.5 bg-[#F5FFFB] flex items-center justify-center border-4 border-transparent px-2 py-1 shadow-sm font-light text-black ring-1 ring-black"
          >
            <MdOutlineAccountBalanceWallet className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderConnectedContainer = () => (
    <div className="relative mt-2 ">
      <div className="absolute inset-0 bg-green-300 ring-1 ring-black"></div>
      <button
        onClick={disconnectWallet}
        className="relative font-space hover:bg-green-50 -inset-x-2 -inset-y-2 hover:-inset-x-1.5 hover:-inset-y-1.5 bg-[#F5FFFB] flex items-center justify-center border-4 border-transparent px-2 py-1 shadow-sm font-light text-black ring-1 ring-black"
      >
        {walletAddress.substring(0, 6) +
          "..." +
          walletAddress.substring(walletAddress.length - 4)}
      </button>
    </div>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <header className="bg-transparent">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <div className="font-monoton textoutline-header text-yellow-500 text-4xl ">
                SolMint
              </div>
            </Link>
          </div>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
      </nav>
    </header>
  );
};

export default Header;
