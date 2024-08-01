import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import ytlogo from '../images/ytlogo.png';

export default function Home() {
  return (
    <main className="flex flex-col h-screen justify-between">
            <Header />
      <div className="flex-grow bg-gradient-to-r from-red-200 to-blue-200 p-6">
        <div className="max-w-4xl mx-auto text-center mt-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to Yu-Gi-Oh! Tournament Toolkit</h1>
          <p className="text-xl">Your ultimate resource for Yu-Gi-Oh! statistics, tools, and projects, with a special focus on the Edison format and retro Yu-Gi-Oh!</p>

          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">Probability of Drawing a Specific Card</h3>
              <p className="mb-4">
                Explore the mathematical principles behind calculating the probability of drawing a specific card in your opening hand using the hypergeometric distribution. This tool helps you understand your deck's consistency and make informed decisions when building your deck.
              </p>
              <Link to="/probability-calculator" className="text-blue-500 underline">
                Check Out The Probability Calculator
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-semibold mb-4">Subscribe to Our YouTube Channel</h2>
            <p className="mb-4 text-center">
                Our YouTube channel focuses on retro Yu-Gi-Oh!, statistics, machine learning, math, and much more. Join our community of enthusiasts and stay updated with the latest strategies, tutorials, and analytical insights.
              </p>
            <div className="mt-2 flex justify-center items-center space-x-4">
              <img src={ytlogo} alt="YouTube Logo" className="w-10" />
              <a href="https://www.youtube.com/@redgadgetyugioh" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Visit Our YouTube Channel
              </a>
            </div>

          </div>
        

        </div>
      </div>
      <Footer />
    </main>
  );
}
