"use client";


import StatisticsTableRow, {
  StatisticsData,
} from "./StatisticsTableRow";


interface StatisticsTableProps {
  statistics: StatisticsData;
  onDelete: () => void;
}



export default function StatisticsTable({

  statistics,

  onDelete,

}: StatisticsTableProps) {


return (

<div

className="
overflow-hidden
rounded-3xl
border
border-white/10
bg-[#080d20]
shadow-xl
"


>


{/* SEARCH */}

<div

className="
border-b
border-white/10
p-5
"


>


<input

placeholder="Search Statistics section..."

className="
h-11
w-full
max-w-md
rounded-xl
border
border-white/10
bg-[#0d142d]
px-4
text-sm
text-white
outline-none
placeholder:text-slate-500
focus:border-cyan-400
"

/>


</div>





<div className="overflow-x-auto">


<table

className="
w-full
min-w-[1100px]
"


>


<thead>


<tr

className="
border-b
border-white/10
bg-[#111a35]
"


>


{

[
"Background",
"Statistic One",
"Statistic Two",
"Statistic Three",
"Status",
"Actions"

].map((item)=>(


<th

key={item}

className="
px-6
py-5
text-left
text-xs
font-semibold
uppercase
tracking-wide
text-slate-400
"

>


{item}


</th>


))


}



</tr>


</thead>





<tbody>


<StatisticsTableRow

statistics={statistics}

onDelete={onDelete}

/>


</tbody>



</table>



</div>



</div>



);



}