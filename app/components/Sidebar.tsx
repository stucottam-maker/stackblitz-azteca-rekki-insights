import Link from "next/link";


export default function Sidebar() {

const links = [
  ["⌂","Dashboard","/"],
  ["✦","Insights","/insights"],
  ["+","Orders","/orders"],
  ["▤","Invoices","/invoices"],
  ["◯","Suppliers","/suppliers"],
  ["▣","Ingredients","/ingredients"],
  ["◇","Recipes","/recipes"],
  ["☰","Menu","/menu"],
  ["□","Stock","/stock"],
  ["↗","Reports","/reports"],
  ["⚙","Settings","/settings"],
];


return (

<aside className="sidebar">


<div className="brand">

<div className="brand-mark">
KI
</div>


<div>

<div className="brand-name">
Kitchen Insights
</div>

<div className="brand-subtitle">
Cost control & operations
</div>

</div>


</div>




<nav className="sidebar-nav">


{
links.map(
([icon,name,url]) => (

<Link
key={name}
href={url}
className="nav-link"
>

<span className="nav-icon">
{icon}
</span>

{name}

</Link>

)
)
}


</nav>



<div className="sidebar-footer">


<div className="restaurant-card">

<div className="restaurant-avatar">
AL
</div>


<div>

<div className="restaurant-name">
Azteca London
</div>

<div className="restaurant-location">
Kitchen workspace
</div>

</div>


</div>


</div>



</aside>

);

}
