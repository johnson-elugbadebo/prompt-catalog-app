import './globals.css';
import Navbar from '@/components/Navbar.js';
import Provider from '@/components/Provider.js';

export const metadata = {
	title: 'Promptopia',
	description: 'Discover & Share AI Prompts',
};

function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body suppressHydrationWarning={true}>
				<Provider>
					<div className='main'>
						<div className='gradient' />
					</div>

					<main className='app'>
						<Navbar />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
}

export default RootLayout;
