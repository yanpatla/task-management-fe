import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
  status: string;
};
export default function DropTask({ status }: DropTaskProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });
  const style = {
    opacity: isOver ? 0.4 : undefined,
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      className="text-xs uppercase font-semibold p-2 border border-dashed border-slate-500 my-5 gird place-content-center text-slate-500"
    >
      {" "}
      Drop Task Here{" "}
    </div>
  );
}
