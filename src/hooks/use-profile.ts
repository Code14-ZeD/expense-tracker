import { useState, useEffect } from 'react';

export interface Profile {
    name: string;
    age: string;
    gender: string;
}

export function useProfile() {
    const [profile, setProfile] = useState<Profile>({
        name: '',
        age: '',
        gender: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('profile');
        if (stored) {
            try {
                setProfile(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse profile', e);
            }
        }
        setLoading(false);
    }, []);

    const updateProfile = (newProfile: Profile) => {
        setProfile(newProfile);
        localStorage.setItem('profile', JSON.stringify(newProfile));
    };

    return { profile, updateProfile, loading };
}
