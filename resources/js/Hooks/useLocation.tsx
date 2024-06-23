import { useEffect, useState } from "react";

const useLocation = () => {
    const [selectedProvince, setSelectedProvince] = useState<string>('Select province');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=780c7f4621dc4d36bbb2cd0883aeb58a&language=en&pretty=1&q=${latitude}+${longitude}`);
                    if (response.ok) {
                        const data = await response.json();
                        setSelectedProvince(data.results[0].components.state);
                    } else {
                        console.error('Error fetching data:', response.statusText);
                    }
                } catch (error: any) {
                    console.error('Error getting location:', error.message);
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.error('Error getting location:', error.message);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    return { selectedProvince, setSelectedProvince, loading };
}

export default useLocation;
