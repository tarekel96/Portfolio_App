export const Navbar = () => {
	const navItems = [
		{
			name: 'Portfolio',
			indexNumber: 0
		},
		{
			name: 'Resume',
			indexNumber: 1
		},
		{
			name: 'About',
			indexNumber: 2
		}
	];
	return (
		<nav>
			{navItems.map((navItem) => {
				return <span key={navItem.indexNumber}>{navItem.name}</span>;
			})}
		</nav>
	);
};
