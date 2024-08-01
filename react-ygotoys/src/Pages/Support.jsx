import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import coffeeLogo from '../images/bmc-button.png';

export default function Support() {
  return (
    <main className="flex flex-col h-screen justify-between">
      <Header />
      <div className="flex-grow p-6">
        <div className="max-w-4xl mx-auto text-center mt-20">
          <h1 className="text-5xl font-bold mb-4">Support Yu-Gi-Oh! Tournament Toolkit</h1>
          <p className="text-xl mb-8">
            Your support helps us continue to provide valuable tools and resources for the Yu-Gi-Oh! community. If you find our tools helpful, please consider supporting us.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-6 bg-gradient-to-r from-red-200 to-blue-200">
            <h2 className="text-3xl font-semibold mb-4">Buy Me a Coffee</h2>
            <p className="mb-4">
              If you enjoy using our website and want to show your support, you can buy us a coffee. Your donations help cover the costs of development and maintenance.
            </p>
            <div className="mt-2 flex justify-center items-center space-x-4">
              <img src={coffeeLogo} alt="Buy Me a Coffee Logo" className="w-32" />
              <a href="https://www.buymeacoffee.com/redgadget" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Support Us on Buy Me a Coffee
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
