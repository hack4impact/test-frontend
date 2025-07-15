import { Button } from "@/components/ui/button";

export default function ActionButtons() {
  return (
    <div className="flex flex-row gap-5 pb-10">
      <Button className="h-12 rounded-sm bg-brand-blue text-2xl font-medium text-white hover:scale-105">
        See all chapters
      </Button>
      <Button className="h-12 rounded-sm bg-brand-green text-2xl font-medium text-white hover:scale-105">
        Propose a nonprofit project
      </Button>
    </div>
  );
}
