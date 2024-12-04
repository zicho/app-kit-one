import { auth, type TAuthResponse } from './auth';

export async function signInEmail({
	user
}: {
	user: { email: string; password: string };
}): Promise<TAuthResponse> {
	try {
		const response = await auth.api.signInEmail({
			body: user,
			asResponse: true // Return raw response
		});

		const setCookieHeader = response.headers.get('set-cookie');

		if (setCookieHeader) {
			// Split multiple cookies if needed
			const cookiesArray = setCookieHeader.split(/, (?=[^;]+=[^;]+)/);

			for (const cookie of cookiesArray) {
				// Parse cookie attributes
				const [cookieString, ...attributes] = cookie.split('; ');

				// Split cookie name and value
				const [name, value] = cookieString.split('=');

				const opts = {
					path: '/',
					httpOnly: attributes.includes('HttpOnly'),
					sameSite: attributes.includes('SameSite=Lax') ? 'lax' : ('strict' as 'lax' | 'strict'),
					maxAge:
						Number(attributes.find((attr: string) => attr.startsWith('Max-Age'))?.split('=')[1]) ??
						undefined
				};

				return {
					success: true,
					session: {
						name,
						value: decodeURIComponent(value),
						opts
					}
				};
			}
		}

		return {
			success: false
		};
	} catch {
		return { success: false };
	}
}
