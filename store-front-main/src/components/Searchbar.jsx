export function Searcbar() {
  return (
    <div className="flex flex-col">
      <input
        className="rounded-lg px-2 py-1 text-slate-900 bg-white w-[300px]"
        type="search"
        placeholder="Buscar en toda la tienda..."
      />
      <span className="icon-menu2" id="btn-buscar">
        <i className="fa-solid fa-magnifying-glass"></i>
      </span>
    </div>
  );
}
