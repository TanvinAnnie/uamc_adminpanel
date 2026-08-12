"use client";


import {
  ArrowRight,
} from "lucide-react";




// =========================================================
// FACILITY TYPE
// =========================================================


export interface FacilityItem {


  _id?: string;


  name: string;


  image: string;


  title: string;


  description: string;


  detailsText: string;


  detailsLink: string;


  isActive: boolean;


  order: number;


}









// =========================================================
// PROPS
// =========================================================


interface FacilitiesRowProps {


  facility: FacilityItem;


  isSelected: boolean;


  onSelect: () => void;


}









// =========================================================
// COMPONENT
// =========================================================


export default function FacilitiesRow({


  facility,


  isSelected,


  onSelect,


}: FacilitiesRowProps) {






return(




<button


type="button"


onClick={onSelect}



className={`


group


flex


min-h-[76px]


w-full


items-center


justify-between


rounded-2xl


border


px-4


py-4


text-left


transition-all


duration-300



sm:min-h-[84px]


sm:px-5



${

isSelected



?


"border-emerald-400/30 bg-[#008B45] text-white shadow-lg"



:


"border-slate-800 bg-[#0d162f] text-slate-300 hover:border-emerald-400/30 hover:bg-emerald-400/10"



}



`}



>









{/* =====================================
    FACILITY NAME
===================================== */}





<span


className={`


truncate


font-semibold


text-base



transition



sm:text-lg



${

isSelected



?


"text-white"



:


"text-slate-200 group-hover:text-emerald-400"



}


`}



>


{facility.name || "Facility"}



</span>









{/* =====================================
    ARROW
===================================== */}




{


!isSelected && (



<span


className="


flex


h-10


w-10


shrink-0


items-center


justify-center


rounded-xl


border


border-emerald-400/20


bg-emerald-400/10


text-emerald-400


transition-all


duration-300


group-hover:bg-emerald-400/20


"

>



<ArrowRight


size={20}


strokeWidth={2}


className="

transition-transform

duration-300

group-hover:translate-x-1

"

/>



</span>



)



}









</button>





);



}