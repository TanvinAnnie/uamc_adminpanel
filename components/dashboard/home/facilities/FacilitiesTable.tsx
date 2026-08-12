"use client";


import {
  useMemo,
} from "react";


import FacilitiesRow, {
  FacilityItem,
} from "./FacilitiesRow";




// =========================================================
// PROPS
// =========================================================


interface FacilitiesTableProps {


  facilities: FacilityItem[];


  selectedFacilityId?: string;


  onSelect: (

    facility: FacilityItem

  ) => void;


}









// =========================================================
// COMPONENT
// =========================================================


export default function FacilitiesTable({


  facilities,


  selectedFacilityId,


  onSelect,


}:FacilitiesTableProps){







// =====================================================
// ACTIVE + SORTED FACILITIES
// =====================================================



const activeFacilities =


useMemo(()=>{


return [...facilities]


.filter(

(facility)=>

facility.isActive !== false

)


.sort(

(a,b)=>

a.order - b.order

);



},[facilities]);









// =====================================================
// SELECTED FACILITY
// =====================================================



const activeSelectedId =


selectedFacilityId ||


activeFacilities[0]?._id;









// =====================================================
// EMPTY STATE
// =====================================================



if(activeFacilities.length === 0){



return(



<div


className="


flex


min-h-[280px]


w-full


items-center


justify-center


rounded-3xl


border


border-slate-800


bg-[#080d20]


px-6


text-center


shadow-xl


"


>



<div>



<div


className="


mx-auto


flex


h-14


w-14


items-center


justify-center


rounded-2xl


border


border-slate-800


bg-[#0d162f]


"

>



<span


className="


text-xl


text-slate-500


"

>

—

</span>


</div>






<p


className="


mt-4


text-sm


font-medium


text-slate-400


"

>


No facilities are available.


</p>





</div>




</div>



);



}









// =====================================================
// RENDER
// =====================================================



return(



<div


className="


flex


w-full


flex-col


gap-4


sm:gap-5


"


>



{


activeFacilities.map(

(facility)=>(



<FacilitiesRow


key={


facility._id ||


`${facility.name}-${facility.order}`


}


facility={facility}



isSelected={


facility._id === activeSelectedId


}




onSelect={()=>


onSelect(facility)


}


/>



)



)



}




</div>



);



}