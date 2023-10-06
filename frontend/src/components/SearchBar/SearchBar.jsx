import "./SearchBar.css";
import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Input from "../Input/Input";
import Button from "../Button/Button";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/?query=${searchQuery}`);
  };

  return (
    <div className='searchBar'>
      <IoSearchOutline size={25}/>
      <Input
        type="text"
        placeholder="Search anything you want?"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleSearch} variant="primary rounded-md">Search</Button>
    </div>
  );
};

export default SearchBar;
