import React from 'react';
import FirstHero from '../Components/FirstHero';
import SecondHero from '../Components/SecondHero';
import Presentation from '../Components/Presentation';
import HeroBtn from '../Components/HeroBtn';

export default function HomePage() {
    return (
        <>
            <FirstHero />
            <SecondHero />
            <HeroBtn />
            <Presentation />
        </>
    )
}
