'use client';

import Profile from '@/components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function MyProfile() {
	const router = useRouter();
	const { data: session } = useSession();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async function () {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();
			setPosts(data);
		};

		if (session?.user.id) fetchPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session?.user.id]);

	const handleEdit = function (post) {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async function (post) {
		const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: 'DELETE',
				});

				const filteredPosts = posts.filter((p) => p._id !== post._id);
				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<Profile
			name='My'
			desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
}
export default MyProfile;
