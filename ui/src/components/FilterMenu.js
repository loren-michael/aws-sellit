import React from 'react';


const FilterMenu = ({ setFilterCategory }) => {

  return (
    <div class="flex flex-wrap justify-center">
        <button class="font-sans font-semibold" onClick={() => setFilterCategory("All")} >View All</button>
        <button class="font-sans font-semibold" onClick={() => setFilterCategory("Guitars")} >Guitars</button>
        <button class="font-sans font-semibold" onClick={() => setFilterCategory("Keyboards & Synth")} >Keyboards & Synth</button>
        <button class="font-sans font-semibold" onClick={() => setFilterCategory("Drums & Percussion")} >Drums & Percussion</button>
        <button class="font-sans font-semibold" onClick={() => setFilterCategory("Folk Instruments")} >Folk Instruments</button>
        <button class="font-sans font-semibold" onClick={() => setFilterCategory("Pedals & Amps")} >Pedals & Amps</button>
        <button class="font-sans font-semibold" onClick={() => setFilterCategory("Microphones")} >Microphones</button>
        <button class="font-sans font-semibold" onClick={() => setFilterCategory("Pro Audio")} >Pro Audio</button>
        <button class="font-sans font-semibold" onClick={() => setFilterCategory("Accessories")} >Accessories</button>
    </div>
    )
};

export default FilterMenu;