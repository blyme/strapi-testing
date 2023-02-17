import qs from "qs";

export function getStrapiURL(path: string) {
    return `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
}

function toJSON(value: any, { pretty }: { pretty: boolean }) {
    const indent = pretty ? 4 : 0;
    return JSON.stringify(value, null, indent);
}
export async function fetchAPI(path: string, urlParamsObject?: object, options?: object): Promise<any>  {
    // Merge default and user options
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
        `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
    }
    return await response.json();
}
