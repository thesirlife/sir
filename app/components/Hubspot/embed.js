"use client"

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const HubspotTracking = ({ session }) => {
	const pathname = usePathname()
	const emailAddress = session?.user?.email ? session.user.email : null;

	var firstLoad = useRef(true);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (emailAddress) {
				var _hsq = window._hsq = window._hsq || [];
				_hsq.push(['setPath', pathname]);
				_hsq.push(['trackPageView']);

				if (firstLoad.current === true) {
					_hsq.push(["identify",{
						email: emailAddress
					}]);

					firstLoad.current = false;
				}
			}
		}
	}, [pathname, emailAddress])


	return null;
};

export default HubspotTracking;