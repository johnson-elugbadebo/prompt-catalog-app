'use client';

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = function ({ data, handleTagClick }) {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((post) => {
				return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />;
			})}
		</div>
	);
};

function Feed() {
	const [allPosts, setAllPosts] = useState([]);

	// Search States
	const [searchText, setSearchText] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchResults, setSearchResults] = useState([]);

	const fetchPosts = async function () {
		const response = await fetch('/api/prompt');
		const data = await response.json();
		setAllPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPrompts = function (searchtext) {
		const regex = new RegExp(searchtext, 'i'); // 'i' flag is for case-insensitive search
		return allPosts.filter(
			(item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
		);
	};

	const handleSearchChange = function (e) {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setSearchResults(searchResult);
			}, 500)
		);
	};

	const handleTagClick = function (tagName) {
		setSearchText(tagName);

		const searchResult = filterPrompts(tagName);
		setSearchResults(searchResult);
	};

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>

			{/* All Prompts */}
			{searchText ? (
				<PromptCardList data={searchResults} handleTagClick={handleTagClick} />
			) : (
				<PromptCardList data={allPosts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
}
export default Feed;
