export default function FormItem({ label, placeholder, name }) {
  return (
    <label htmlFor={name} className="flex flex-col gap-2">
      {label}
      <input
        className="outline-0 rounded-lg px-2 py-1 border border-cyan-600"
        type="text"
        name={name}
        placeholder={placeholder}
      />
    </label>
  );
}
