
import React, { useEffect, useState } from 'react';
import { Search, Bell, User, PlusCircle, Menu, X } from 'lucide-react';
import { ViewState } from '../types.ts';

interface NavbarProps {
  setViewState: (view: ViewState) => void;
  onSearch: (query: string) => void;
  onOpenAddMovie: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ setViewState, onSearch, onOpenAddMovie }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsMobileMenuOpen(false);
      setShowSearchInput(false);
    }
  };

  const navLinks = [
    { name: 'Home', action: () => setViewState(ViewState.HOME) },
    { name: 'TV Shows', action: () => {} },
    { name: 'Movies', action: () => {} },
    { name: 'New & Popular', action: () => {} },
    { name: 'My List', action: () => {} },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-netflixDark shadow-lg' : 'bg-gradient-to-b from-black via-black/50 to-transparent'}`}>
      <div className="px-4 md:px-12 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-8">
            {/* Mobile Menu Button */}
            <button className="md:hidden text-white hover:text-gray-300 transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
            </button>

          <button 
            onClick={() => {
                setViewState(ViewState.HOME);
                setIsMobileMenuOpen(false);
            }}
            className="text-netflixRed text-2xl md:text-3xl font-bold cursor-pointer tracking-tighter"
          >
            ANYMOVIE
          </button>
          
          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-5 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
                <li key={link.name} onClick={link.action} className="hover:text-white cursor-pointer transition duration-300">
                    {link.name}
                </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-2 md:space-x-5 text-white">
          <div className="flex items-center">
             <form onSubmit={handleSearchSubmit} className={`flex items-center transition-all duration-300 ${showSearchInput ? 'bg-black/80 border border-white' : 'bg-transparent border border-transparent'} px-2 py-1`}>
                <button 
                    type="button"
                    onClick={() => {
                        if(showSearchInput && searchQuery) {
                            handleSearchSubmit({preventDefault: ()=>{}} as any);
                        } else {
                            setShowSearchInput(!showSearchInput);
                        }
                    }}
                >
                    <Search className="w-5 h-5 cursor-pointer" />
                </button>
                <input 
                    type="text" 
                    placeholder="Search titles, genres..." 
                    className={`bg-transparent text-white text-sm ml-2 outline-none transition-all duration-300 placeholder-gray-400 ${showSearchInput ? 'w-40 md:w-64 opacity-100' : 'w-0 opacity-0'}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
             </form>
          </div>
          
          {/* Add Movie Button */}
           <button 
            onClick={onOpenAddMovie}
            className="text-white hover:text-gray-300 transition"
            title="Add Custom Movie"
           >
            <PlusCircle className="w-6 h-6" />
           </button>

          <span className="text-sm cursor-pointer hover:text-gray-300 hidden md:block font-medium">Kids</span>
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <div className="flex items-center cursor-pointer group">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
                <User className="w-5 h-5" />
            </div>
            <div className="ml-2 w-0 h-0 border-l-[5px] border-l-transparent border-t-[5px] border-t-white border-r-[5px] border-r-transparent group-hover:rotate-180 transition-transform hidden md:block"></div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden bg-netflixDark/95 backdrop-blur-sm absolute top-16 left-0 w-full border-t border-gray-800 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className="flex flex-col p-6 space-y-4 text-gray-300 text-sm font-semibold text-center">
                {navLinks.map((link) => (
                    <li 
                        key={link.name} 
                        onClick={() => {
                            link.action();
                            setIsMobileMenuOpen(false);
                        }}
                        className="hover:text-white cursor-pointer py-2 border-b border-gray-700 last:border-0"
                    >
                        {link.name}
                    </li>
                ))}
                <li className="hover:text-white cursor-pointer py-2">Kids</li>
            </ul>
        </div>
    </nav>
  );
};

export default Navbar;
