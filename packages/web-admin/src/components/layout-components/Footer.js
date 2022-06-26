import React from 'react'

export default function Footer() {
	return (
		<footer className="footer">
			<span>Copyright  &copy;  {`${new Date().getFullYear()}`}</span>
		</footer>
	)
}

