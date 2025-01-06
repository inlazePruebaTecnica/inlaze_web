export default function Button({ classExtra, onClick, text }) {
  return (
    <button
      className={
        " hover:bg-[--secondaryButton] px-4 py-3 rounded-lg bg-[--foreground] " +
        classExtra
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
}
